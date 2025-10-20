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
  // If vendor, require businessName and vendorType
  if (form.role === 'Vendor') {
    if (!form.businessName || typeof form.businessName !== 'string') return 'Business name is required for vendors.';
    if (!form.vendorType || typeof form.vendorType !== 'string') return 'Vendor type is required.';
  }
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

    // Insert into DB (include vendor fields if present)
    await sql`
      INSERT INTO waitlist (name, email, country_code, phone, referral, service, role, business_name, vendor_type, updates, created_at)
      VALUES (
        ${form.name},
        ${form.email},
        ${form.countryCode},
        ${form.phone},
        ${form.referral},
        ${form.service},
        ${form.role || 'Customer'},
        ${form.businessName || null},
        ${form.vendorType || null},
        ${!!form.updates},
        ${new Date().toISOString()}
      )
    `;

    // Internal team notification
    const waitlistNotification = {
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      // Use an internal team template; prefer env var so you can change without code edits
      templateId: '15308042-5368-4e9c-81ce-b811796d3a3b'|| '1383341c-9265-467d-9874-06efa9dcb426',
      subject: form.role === 'Vendor' ? 'New Vendor Signup' : 'New Waitlist Signup',
      substitutions: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        countryCode: form.countryCode,
        referral: form.referral,
        service: form.service,
        role: form.role || 'Customer',
        businessName: form.businessName || '',
        vendorType: form.vendorType || ''
      }
    };
    try {
      await sgMail.send(waitlistNotification);
    } catch (err) {
      // Log but don't fail the request if notification fails
      console.error('SendGrid team notification error:', err.message);
    }

    // Confirmation email using a dynamic template (only for new users)
    // Choose a confirmation template depending on role
    const userMsg = {
      to: form.email,
      from: { email: 'no-reply@synkkafrica.com', name: 'Synkkafrica Team' },
      subject: form.role === 'Vendor' ? 'Thanks for joining as a Vendor' : 'You’re on the Synkkafrica Waitlist!',
  templateId: form.role === 'Vendor' ? 'cdf235c1-d6ad-4490-a68e-755f620fddd9' : '0ffcaf65-dc47-4c17-853e-3a43153ec4e7',
      substitutions: {
        name: form.name,
        email: form.email,
        businessName: form.businessName || '',
        vendorType: form.vendorType || ''
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