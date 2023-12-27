-- Drop Existing Tables --
DROP TABLE users CASCADE;
DROP TABLE organizations CASCADE;
DROP TABLE companies CASCADE;
DROP TABLE fields CASCADE;
DROP TABLE offers CASCADE;
DROP TABLE products CASCADE;

-- User Table
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    pw VARCHAR(50)
);

-- Organization Table
CREATE TABLE organizations (
    id INT PRIMARY KEY,
    org_name VARCHAR(100) UNIQUE
);

-- Company Table
CREATE TABLE companies (
    id INT PRIMARY KEY,
    comp_name VARCHAR(100) UNIQUE
);

-- Company-Organization Table
CREATE TABLE fields (
    comp_id INT,
    comp_type INT,
    FOREIGN KEY (comp_id) REFERENCES companies(id),
    FOREIGN KEY (comp_type) REFERENCES organizations(id)
);

-- Offers Table
CREATE TABLE offers (
    comp_id INT,
    org_type INT,
    max_guest_count INT,
    time_period VARCHAR(50),
    price DECIMAL(10,2),
    accepted BOOLEAN DEFAULT FALSE,
    accepted_by_id INT DEFAULT NULL,
    FOREIGN KEY (comp_id) REFERENCES companies(id),
    FOREIGN KEY (org_type) REFERENCES organizations(id),
    FOREIGN KEY (accepted_by_id) REFERENCES users(id)
);

-- Product Table
CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_type INT,
    FOREIGN KEY (product_type) REFERENCES organizations(id)
);
