// netlify/functions/waitlist.js
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key in Netlify environment variables as SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, countryCode, referral, service } = data;

    // Compose the email
    const msg = {
      to: 'support@synkkafrica.com',
      from: 'no-reply@synkkafrica.com', // Use a verified sender
      subject: 'New Waitlist Signup',
      text: `New waitlist signup:\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nReferral: ${referral}\nService: ${service}`,
      html: `<h2>New Waitlist Signup</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode} ${phone}</p>
        <p><b>Referral:</b> ${referral}</p>
        <p><b>Service:</b> ${service}</p>`
    };

    // Send notification to support
    await sgMail.send(msg);

    // Send confirmation to user
    const userMsg = {
      to: email,
      from: 'no-reply@synkkafrica.com',
      subject: 'You’re on the Synkkafrica Waitlist!',
      text: `Hi ${name || ''},\n\nThank you for joining the Synkkafrica waitlist! We’ll keep you updated with the latest news and early access.\n\nBest,\nThe Synkkafrica Team`,
      html: `<h2>Thank you for joining the Synkkafrica waitlist!</h2><p>Hi${name ? ' ' + name : ''},</p><p>We’ll keep you updated with the latest news and early access.</p><p>Best,<br/>The Synkkafrica Team</p>`
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
