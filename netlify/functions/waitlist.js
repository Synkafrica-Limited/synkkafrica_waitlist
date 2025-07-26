// netlify/functions/waitlist.js
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key in Netlify environment variables as SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, countryCode, referral, service } = data;

    // Compose the email
    const msg = {
      to: "info@synkkafrica.com",
      from: "no-reply@synkkafrica.com", // Use a verified sender
      subject: "New Waitlist Signup",
      text: `New waitlist signup:\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nReferral: ${referral}\nService: ${service}`,
      html: `<h2>New Waitlist Signup</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode} ${phone}</p>
        <p><b>Referral:</b> ${referral}</p>
        <p><b>Service:</b> ${service}</p>`,
    };

    // Send notification to support
    await sgMail.send(msg);

    // Send confirmation to user
    const userMsg = {
      to: email,
      from: {
        email: "no-reply@synkkafrica.com", // Must be verified in SendGrid
        name: "Synkkafrica Team",
      },
      templateId: "d-c16b0c5a05e04a2183bf84044764d62", 
      dynamic_template_data: {
        name,
        email,
        phone: `${countryCode} ${phone}`,
        referral,
        service,
      },
    };

    await sgMail.send(userMsg);

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
