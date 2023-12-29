-- Users Table
DROP SEQUENCE users_id_seq;
DROP TABLE IF EXISTS users CASCADE;
CREATE SEQUENCE users_id_seq START WITH 101 INCREMENT BY 1;
CREATE TABLE users (
    id INT DEFAULT nextval('users_id_seq') PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pw VARCHAR(50) NOT NULL
);
-- Organization Table
DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
    id INT PRIMARY KEY,
    org_name VARCHAR(100) UNIQUE NOT NULL
);
-- Company Table
DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
    id INT PRIMARY KEY,
    comp_name VARCHAR(100) UNIQUE NOT NULL
);
-- Fields Table
DROP TABLE IF EXISTS fields CASCADE;
CREATE TABLE fields (
    comp_id INT,
    comp_type INT,
    FOREIGN KEY (comp_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (comp_type) REFERENCES organizations(id) ON DELETE CASCADE
);
-- Offers Table
DROP TABLE IF EXISTS offers CASCADE;
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    comp_id INT,
    org_type INT,
    max_guest_count INT NOT NULL,
    time_period VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,
    accepted_by_id INT DEFAULT NULL,
    CHECK (price >= 0),
    CHECK (max_guest_count > 0),
    FOREIGN KEY (comp_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (org_type) REFERENCES organizations(id) ON DELETE CASCADE
);
-- Product Table
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_type INT,
    FOREIGN KEY (product_type) REFERENCES organizations(id) ON DELETE CASCADE
);
-- View (şirketleri ve hangi organizasyonlara hizmet verdiklerini listeler)
CREATE OR REPLACE VIEW company_view AS
SELECT DISTINCT companies.comp_name,
    organizations.org_name
FROM companies,
    organizations,
    fields
WHERE fields.comp_id = companies.id
    AND fields.comp_type = organizations.id
ORDER BY companies.comp_name;
-- Trigger (kullanıcı silinirse kabul ettiği teklifler tekrar kullanıma açılır)
DROP TRIGGER IF EXISTS user_delete_trigger ON users;
DROP FUNCTION IF EXISTS update_accepted_by_id;
CREATE OR REPLACE FUNCTION update_accepted_by_id() RETURNS TRIGGER AS $$ BEGIN
UPDATE offers
SET accepted = 'FALSE',
    accepted_by_id = NULL
WHERE accepted_by_id = OLD.id;
RETURN OLD;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER user_delete_trigger
AFTER DELETE ON users FOR EACH ROW EXECUTE PROCEDURE update_accepted_by_id();
-- Function (girilen organizasyon için kaç adet açık teklifin bulunduğunu döndüren fonksiyon)
CREATE OR REPLACE FUNCTION offerCount(organizationName organizations.org_name %TYPE) RETURNS INT AS $$
DECLARE offer_count INT;
BEGIN offer_count := 0;
SELECT COUNT(offers.comp_id) INTO offer_count
FROM companies,
    offers,
    organizations
WHERE companies.id = offers.comp_id
    AND offers.org_type = organizations.id
    AND organizations.org_name = organizationName
    AND offers.accepted = 'FALSE';
RETURN offer_count;
END;
$$ LANGUAGE plpgsql;