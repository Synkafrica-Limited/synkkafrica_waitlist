// netlify/functions/waitlist.js
const sgMail = require('@sendgrid/mail');
const { neon } = require('@netlify/neon');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sql = neon(); // uses NETLIFY_DATABASE_URL

function validate(form) {
  if (!form.name || typeof form.name !== 'string' || form.name.length < 2) return 'Name is required.';
  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Valid email is required.';
  if (!form.phone || !/^[0-9]{7,15}$/.test(form.phone)) return 'Valid phone number is required.';
  if (!form.countryCode || typeof form.countryCode !== 'string') return 'Country code is required.';
  if (!form.referral || typeof form.referral !== 'string') return 'Referral is required.';
  if (!form.service || typeof form.service !== 'string') return 'Service is required.';
  if ((form.role === 'Vendor') || (form.role ?? '') === 'Vendor') {
    if (!form.businessName || typeof form.businessName !== 'string') return 'Business name is required for vendors.';
    if (!form.vendorType || typeof form.vendorType !== 'string') return 'Vendor type is required.';
  }
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const form = JSON.parse(event.body);
    const error = validate(form);
    if (error) return { statusCode: 400, body: JSON.stringify({ error }) };

    // Normalize role (force Vendor/Customer)
    const role = (form.role === 'Vendor') ? 'Vendor' : 'Customer';

    // 1) Duplicate check
    const { rows } = await sql`SELECT id FROM waitlist WHERE email = ${form.email}`;
    const existing = rows && rows[0];
    if (existing) {
      return { statusCode: 409, body: JSON.stringify({ error: 'This email is already on the waitlist.' }) };
    }

    // 2) Insert
    await sql`
      INSERT INTO waitlist (
        name, email, country_code, phone, referral, service, role, business_name, vendor_type, updates
      ) VALUES (
        ${form.name},
        ${form.email},
        ${form.countryCode},
        ${form.phone},
        ${form.referral},
        ${form.service},
        ${role},
        ${form.businessName || null},
        ${form.vendorType || null},
        ${!!form.updates}
      )
    `;

    // 3) Internal team notification (dynamic template)
    // templateId should be your internal-notify template (the CTA-free one you just finalized)
    const internalMsg = {
      to: 'info@synkkafrica.com',
      from: { email: 'no-reply@synkkafrica.com', name: 'SynkkAfrica Alerts' },
      // Allow separate internal templates for Vendor vs Customer via env vars.
      // - SENDGRID_INTERNAL_VENDOR_NOTIFY_TEMPLATE_ID: template for vendor signups
      // - SENDGRID_INTERNAL_CUSTOMER_NOTIFY_TEMPLATE_ID: template for customer signups
      templateId: role === 'Vendor'
        ? (process.env.SENDGRID_INTERNAL_VENDOR_NOTIFY_TEMPLATE_ID || '15308042-5368-4e9c-81ce-b811796d3a3b')
        : (process.env.SENDGRID_INTERNAL_CUSTOMER_NOTIFY_TEMPLATE_ID || '1383341c-9265-467d-9874-06efa9dcb426'),
      dynamic_template_data: {
        submitted_at: new Date().toISOString(),
        businessName: form.businessName || '',
        service: form.service,
        vendorType: form.vendorType || '',
        name: form.name,
        email: form.email,
        phone: form.phone,
        countryCode: form.countryCode,
        referral: form.referral,
        role,
        ops_notes: '' // optional
      }
    };
    try { await sgMail.send(internalMsg); } catch (e) { console.error('SendGrid internal notify error:', e?.response?.body || e.message); }

    // 4) User confirmation (dynamic template)
    const userMsg = {
      to: form.email,
      from: { email: 'no-reply@synkkafrica.com', name: 'SynkkAfrica Team' },
      templateId: role === 'Vendor'
        ? (process.env.SENDGRID_VENDOR_CONFIRM_TEMPLATE_ID || 'cdf235c1-d6ad-4490-a68e-755f620fddd9')
        : (process.env.SENDGRID_CUSTOMER_CONFIRM_TEMPLATE_ID || '0ffcaf65-dc47-4c17-853e-3a43153ec4e7'),
      dynamic_template_data: {
        name: form.name,
        email: form.email,
        businessName: form.businessName || '',
        vendorType: form.vendorType || ''
      }
    };
    try { await sgMail.send(userMsg); } catch (e) { console.error('SendGrid user confirm error:', e?.response?.body || e.message); }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
