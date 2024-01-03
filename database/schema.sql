-- Users Table
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;
DROP TABLE IF EXISTS users CASCADE;
CREATE SEQUENCE users_id_seq START WITH 101 INCREMENT BY 1;
CREATE TABLE users (
    id INT DEFAULT nextval('users_id_seq') PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pw VARCHAR(50) NOT NULL
);
-- Balance Table
DROP TABLE IF EXISTS balance CASCADE;
CREATE TABLE balance (
    user_id INT,
    amount INT NOT NULL,
    CHECK (amount >= 0),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
    price INT NOT NULL,
    stock INT NOT NULL,
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
-- View (tüm teklifleri listeler (intersect ile sadece açıktaki teklifler olacak şekilde sorgu yapılacak))
DROP VIEW IF EXISTS offer_view;
CREATE OR REPLACE VIEW offer_view AS
SELECT offers.id,
    companies.comp_name,
    offers.time_period,
    offers.max_guest_count,
    offers.price,
    org_name
FROM companies,
    organizations,
    fields,
    offers
WHERE fields.comp_id = companies.id
    AND fields.comp_type = organizations.id
    AND offers.org_type = organizations.id
    AND offers.comp_id = companies.id
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
-- Trigger (yeni kaydolan kullanıcıya 100 lira hoş geldin bonusu)
DROP TRIGGER IF EXISTS insert_into_balance_trigger ON users;
DROP FUNCTION IF EXISTS insert_into_balance;
CREATE OR REPLACE FUNCTION insert_into_balance() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO balance (user_id, amount)
VALUES (NEW.id, 1000);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER insert_into_balance_trigger
AFTER
INSERT ON users FOR EACH ROW EXECUTE FUNCTION insert_into_balance();
-- Function (girilen organizasyon için kaç adet açık teklifin bulunduğunu döndüren fonksiyon)
DROP FUNCTION IF EXISTS offerCount(
    organizations.org_name %TYPE,
    offers.time_period %TYPE,
    offers.max_guest_count %TYPE
);
CREATE OR REPLACE FUNCTION offerCount(
        organizationName organizations.org_name %TYPE,
        timePeriod offers.time_period %TYPE,
        maxGuestCount offers.max_guest_count %TYPE
    ) RETURNS INT AS $$
DECLARE offer_count INT;
BEGIN offer_count := 0;
SELECT COUNT(*) INTO offer_count
FROM (
        SELECT comp_name,
            MIN(price)
        FROM companies,
            offers,
            organizations
        WHERE companies.id = offers.comp_id
            AND offers.org_type = organizations.id
            AND organizations.org_name = organizationName
            AND offers.accepted = 'FALSE'
            AND offers.time_period = timePeriod
            AND offers.max_guest_count >= maxGuestCount
        GROUP BY comp_name
    );
RETURN offer_count;
END;
$$ LANGUAGE plpgsql;
-- Function (record içeren - kullanıcı bilgilerini gösterir (kullanıcı adı, bakiye, kaç adet teklif kabul ettiği))
DROP TYPE IF EXISTS user_info CASCADE;
CREATE TYPE user_info AS (
    username VARCHAR(50),
    balance INT,
    accepted_offer_count INT
);
DROP FUNCTION IF EXISTS getUserInfo(users.id %TYPE);
CREATE OR REPLACE FUNCTION getUserInfo(userId users.id %TYPE) RETURNS user_info AS $$
DECLARE information user_info;
accepted_offer_count INT;
BEGIN
SELECT COUNT(*) INTO accepted_offer_count
FROM offers,
    organizations
WHERE accepted_by_id = userId
    AND organizations.id = offers.org_type;
SELECT username,
    amount,
    accepted_offer_count INTO information
FROM users,
    balance,
    organizations
WHERE users.id = userId
    AND balance.user_id = users.id;
RETURN information;
END;
$$ LANGUAGE plpgsql;
-- Function (record ve cursor içeren - stokta bulunan ürünleri listeler aynı zamanda group by ve having de içeriyor)
DROP TYPE IF EXISTS product_info CASCADE;
CREATE TYPE product_info AS (
    product_id INT,
    product_name VARCHAR(50),
    price INT,
    stock INT
);
DROP FUNCTION IF EXISTS getProductsInStock(organizations.org_name %TYPE);
CREATE OR REPLACE FUNCTION getProductsInStock(organizationName organizations.org_name %TYPE) RETURNS product_info [] AS $$
DECLARE stock_cursor CURSOR FOR
SELECT products.id,
    product_name,
    price,
    stock
FROM products,
    organizations
WHERE products.product_type = organizations.id
    AND organizations.org_name = organizationName
GROUP BY(products.id, product_name, price, stock)
HAVING SUM(stock) > 0;
prod product_info [];
i INT;
BEGIN i := 1;
FOR stock_record IN stock_cursor LOOP prod [i] = stock_record;
i := i + 1;
END LOOP;
RETURN prod;
END;
$$ LANGUAGE plpgsql;