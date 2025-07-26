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
    const msg = {
      to: 'info@synkkafrica.com',
      from: 'no-reply@synkkafrica.com',
      subject: 'New Waitlist Signup',
      text: `New waitlist signup:\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\nReferral: ${referral}\nService: ${service}`,
      html: `<h2>New Waitlist Signup</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${countryCode} ${phone}</p><p><b>Referral:</b> ${referral}</p><p><b>Service:</b> ${service}</p>`
    };

    await sgMail.send(msg);

// Confirmation email using a dynamic template
    const userMsg = {
      to: email,
      from: { email: 'no-reply@synkkafrica.com', name: 'Synkkafrica Team' },
      subject: 'You’re on the Synkkafrica Waitlist!', 
      templateId: 'YOUR_LEGACY_TEMPLATE_ID',
      substitutions: {
        name: name,
        email: email,
      },
      // html or text can be omitted if your template contains all content.
      // If your template includes <%body%>, supply html/text here:
      // html: '<p>Some additional content</p>'
    };

    await sgMail.send(userMsg);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};