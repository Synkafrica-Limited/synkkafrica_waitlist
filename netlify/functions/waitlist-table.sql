-- If creating fresh:
DROP TABLE IF EXISTS waitlist;

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  country_code VARCHAR(10) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  referral VARCHAR(50) NOT NULL,
  service VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'Customer',
  business_name VARCHAR(150),
  vendor_type VARCHAR(100),
  updates BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- If patching an existing table instead, run:
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'Customer';
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS business_name VARCHAR(150);
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS vendor_type VARCHAR(100);
