const sgMail = require('@sendgrid/mail');
const { neon } = require('@netlify/neon');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

    // Send notification to support
    const msg = {
      to: 'support@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      subject: 'New Waitlist Signup',
      text: `New waitlist signup:\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.countryCode} ${form.phone}\nReferral: ${form.referral}\nService: ${form.service}`,
      html: `<h2>New Waitlist Signup</h2>
        <p><b>Name:</b> ${form.name}</p>
        <p><b>Email:</b> ${form.email}</p>
        <p><b>Phone:</b> ${form.countryCode} ${form.phone}</p>
        <p><b>Referral:</b> ${form.referral}</p>
        <p><b>Service:</b> ${form.service}</p>`
    };
    await sgMail.send(msg);

    // Send confirmation to user
    const userMsg = {
      to: form.email,
      from: 'no-reply@synkkafrica.com',
      subject: 'You’re on the Synkkafrica Waitlist!',
      text: `Hi ${form.name || ''},\n\nThank you for joining the Synkkafrica waitlist! We’ll keep you updated with the latest news and early access.\n\nBest,\nThe Synkkafrica Team`,
      html: `<h2>Thank you for joining the Synkkafrica waitlist!</h2><p>Hi${form.name ? ' ' + form.name : ''},</p><p>We’ll keep you updated with the latest news and early access.</p><p>Best,<br/>The Synkkafrica Team</p>`
    };
    await sgMail.send(userMsg);

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