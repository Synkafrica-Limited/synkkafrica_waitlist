// netlify/functions/contact.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure the wrapper characters for legacy template substitutions
sgMail.setSubstitutionWrappers('{{', '}}');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // 1. Notify your support team (plain text + HTML email)
    await sgMail.send({
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      subject: 'New Contact Form Message',
      text: `New contact form message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h2>New Contact Form Message</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b></p><p>${message}</p>`
    });

    // 2. Confirmation email using a legacy transactional template
    const confirmation = {
      to: email,
      from: { email: 'no-reply@synkkafrica.com', name: 'Synkkafrica Team' },
      templateId: 'c2565d0b-9267-43e9-bdbd-acf167400806', 
      subject: 'Thank you for contacting Synkkafrica!', // Used if your template contains <%subject%>
      substitutions: {
        name: name,
        message: message
      }
    };

    await sgMail.send(confirmation);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
