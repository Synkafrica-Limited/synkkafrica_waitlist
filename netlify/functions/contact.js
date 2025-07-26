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
    // Contact Form Notification (support team)
    const contactNotification = {
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      templateId: '3ad8ff8f-0628-45df-b8b8-dd3f558c786c',
      // If your template includes <%subject%>, pass the subject here; otherwise omit it
      subject: 'New Contact Form Message',
      substitutions: {
        name: name,
        email: email,
        message: message
      }
    };
    await sgMail.send(contactNotification);

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
