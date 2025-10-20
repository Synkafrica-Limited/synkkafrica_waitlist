// Local invoker for netlify function `waitlist.js` with lightweight stubs for
// `@netlify/neon` and `@sendgrid/mail` so you can test POST handling without
// Netlify Dev or external network calls.

process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'LOCAL_DUMMY_KEY';

// Patch @netlify/neon before loading the function so the function gets the stub.
try {
  const neonMod = require('@netlify/neon');
  neonMod.neon = () => {
    // Return a 'sql' tagged template function
    return async (strings, ...values) => {
      const q = strings[0] || '';
      // Simulate duplicate check SELECT
      if (/SELECT\s+id\s+FROM\s+waitlist/i.test(q)) {
        // Return empty array => no existing record
        return [];
      }
      // Simulate INSERT
      if (/INSERT\s+INTO\s+waitlist/i.test(q)) {
        return { rowCount: 1 };
      }
      return [];
    };
  };
  console.log('Patched @netlify/neon.neon for local test.');
} catch (err) {
  console.warn('Could not patch @netlify/neon (module missing):', err.message);
}

// Patch @sendgrid/mail
try {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey = () => {};
  sgMail.setSubstitutionWrappers = () => {};
  sgMail.send = async (msg) => {
    console.log('Mock SendGrid send called. templateId=', msg.templateId || msg.template_id || '(none)');
    return [{ statusCode: 202 }];
  };
  console.log('Patched @sendgrid/mail for local test.');
} catch (err) {
  console.warn('Could not patch @sendgrid/mail (module missing):', err.message);
}

// Load and invoke the function
const path = require('path');
const fnPath = path.resolve(__dirname, '..', 'netlify', 'functions', 'waitlist.js');
const fn = require(fnPath);

(async () => {
  const event = {
    httpMethod: 'POST',
    body: JSON.stringify({
      name: 'Local Test User',
      email: `local+${Date.now()}@example.com`,
      phone: '1234567890',
      countryCode: '+254',
      referral: 'Friend',
      service: 'Shipping',
      role: 'Customer',
      updates: true
    })
  };

  try {
    const res = await fn.handler(event);
    console.log('Function response:', res);
  } catch (err) {
    console.error('Error invoking function locally:', err);
  }
})();
