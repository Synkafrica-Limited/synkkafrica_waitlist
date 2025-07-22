// netlify/functions/contact.js
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
    const { name, email, message } = data;

    // Send notification to support team
    const supportMsg = {
      to: 'support@synkkafrica.com',
      from: 'no-reply@synkkafrica.com', // Use a verified sender
      subject: 'New Contact Form Message',
      text: `New contact form message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>`
    };

    await sgMail.send(supportMsg);

    // Send confirmation to user
    const userMsg = {
      to: email,
      from: 'no-reply@synkkafrica.com',
      subject: 'Thank you for contacting Synkkafrica!',
      text: `Hi ${name || ''},\n\nThank you for reaching out to us! We've received your message and will get back to you within 24-48 hours.\n\nYour message:\n"${message}"\n\nBest regards,\nThe Synkkafrica Team`,
      html: `<h2>Thank you for contacting Synkkafrica!</h2>
        <p>Hi${name ? ' ' + name : ''},</p>
        <p>Thank you for reaching out to us! We've received your message and will get back to you within 24-48 hours.</p>
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
          <p><strong>Your message:</strong></p>
          <p>"${message}"</p>
        </div>
        <p>Best regards,<br/>The Synkkafrica Team</p>`
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
