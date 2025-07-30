const sgMail = require('@sendgrid/mail');
const { neon } = require('@netlify/neon');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');
const sql = neon(); // Uses NETLIFY_DATABASE_URL

function validate(form) {
  // Basic validation for types
  if (!form.name || typeof form.name !== 'string' || form.name.length < 2) return 'Name is required.';
  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Valid email is required.';
  if (!form.phone || !/^[0-9]{7,15}$/.test(form.phone)) return 'Valid phone number is required.';
  if (!form.countryCode || typeof form.countryCode !== 'string') return 'Country code is required.';
  if (!form.referral || typeof form.referral !== 'string') return 'Referral is required.';
  if (!form.service || typeof form.service !== 'string') return 'Service is required.';
  return null;
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const form = JSON.parse(event.body);
    const error = validate(form);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error }),
      };
    }

    // Check for duplicate email
    const [existing] = await sql`SELECT id FROM waitlist WHERE email = ${form.email}`;
    if (existing) {
      // Only return 409, do not send confirmation email
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'This email is already on the waitlist.' }),
      };
    }

    // Insert into DB
    await sql`
      INSERT INTO waitlist (name, email, country_code, phone, referral, service, updates, created_at)
      VALUES (
        ${form.name},
        ${form.email},
        ${form.countryCode},
        ${form.phone},
        ${form.referral},
        ${form.service},
        ${!!form.updates},
        ${new Date().toISOString()}
      )
    `;

    // Internal team notification
    const waitlistNotification = {
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      templateId: '1383341c-9265-467d-9874-06efa9dcb426',
      subject: 'New Waitlist Signup',
      substitutions: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        countryCode: form.countryCode,
        referral: form.referral,
        service: form.service
      }
    };
    try {
      await sgMail.send(waitlistNotification);
    } catch (err) {
      // Log but don't fail the request if notification fails
      console.error('SendGrid team notification error:', err.message);
    }

    // Confirmation email using a dynamic template (only for new users)
    const userMsg = {
      to: form.email,
      from: { email: 'no-reply@synkkafrica.com', name: 'Synkkafrica Team' },
      subject: 'You’re on the Synkkafrica Waitlist!',
      templateId: '0ffcaf65-dc47-4c17-853e-3a43153ec4e7',
      substitutions: {
        name: form.name,
        email: form.email,
      },
    };
    try {
      await sgMail.send(userMsg);
    } catch (err) {
      // Log but don't fail the request if confirmation fails
      console.error('SendGrid user confirmation error:', err.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};