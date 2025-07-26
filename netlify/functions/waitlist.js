const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, countryCode, referral, service } = data;

    // Internal team notification
   const waitlistNotification = {
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      templateId: '1383341c-9265-467d-9874-06efa9dcb426',
      subject: 'New Waitlist Signup', // Only needed if your template uses <%subject%>
      substitutions: {
        name: name,
        email: email,
        phone: phone,
        countryCode: countryCode,
        referral: referral,
        service: service
      }
    };
    await sgMail.send(waitlistNotification);

// Confirmation email using a dynamic template
    const userMsg = {
      to: email,
      from: { email: 'no-reply@synkkafrica.com', name: 'Synkkafrica Team' },
      subject: 'You’re on the Synkkafrica Waitlist!', 
      templateId: '0ffcaf65-dc47-4c17-853e-3a43153ec4e7',
      substitutions: {
        name: name,
        email: email,
      },
    };

    await sgMail.send(userMsg);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};