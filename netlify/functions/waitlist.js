const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    // User confirmation with dynamic template
    const userMsg = {
      to: email,
      from: {
        email: 'no-reply@synkkafrica.com',
        name: 'Synkkafrica Team'
      },
      templateId: ' d-c16b0c5a05e04a2183bf84044764d622',
      dynamic_template_data: {
        name,
        email,
        phone: `${countryCode} ${phone}`,
        referral,
        service
      }
    };

    try {
      await sgMail.send(userMsg);
    } catch (sendgridErr) {
      console.error('SendGrid Template Error:', sendgridErr);

      // Fallback: plain email
      const fallbackMsg = {
        to: email,
        from: 'no-reply@synkkafrica.com',
        subject: 'You’re on the Synkkafrica Waitlist!',
        text: `Hi ${name || ''},\n\nThank you for joining the Synkkafrica waitlist! We’ll keep you updated with the latest news and early access.\n\nBest,\nThe Synkkafrica Team`
      };
      await sgMail.send(fallbackMsg);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Waitlist handler failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
