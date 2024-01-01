-- view kullanarak girilen organizasyona ait şirketleri listeler
SELECT *
FROM company_view
WHERE org_name = `$user_input`;
-- kullanıcıyı id'sini sequence kullanarak oluşturup listeye ekler
INSERT INTO users (id, username, pw)
VALUES (nextval('users_id_seq'), `$username`, `password`);
-- kullanıcının silinmesi
DELETE FROM users
WHERE id = `$user_id`;
-- intersect ve view kullanarak verilen koşullar için en az bir açıkta teklifi bulunan şirketleri listeler
-- (aynı zamanda having ve group by da içeriyor)
SELECT DISTINCT *
FROM company_view
WHERE org_name = `$user_input`
INTERSECT
SELECT companies.comp_name,
    organizations.org_name
FROM companies,
    organizations
WHERE companies.comp_name IN (
        SELECT companies.comp_name
        FROM companies,
            offers,
            organizations
        WHERE companies.id = offers.comp_id
            AND offers.org_type = organizations.id
            AND organizations.org_name = `$user_input`
            AND offers.accepted = 'FALSE'
        GROUP BY companies.comp_name
        HAVING COUNT(offers.comp_id) > 0
    );
-- intersect kullanarak girilen parametreleri için açıktaki teklifleri listeler
SELECT DISTINCT *
FROM offer_view
WHERE org_name = `$user_input`
    AND time_period = `$user_input`
    AND max_guest_count >= `$user_input`
INTERSECT
SELECT DISTINCT companies.comp_name,
    offers.time_period,
    offers.max_guest_count,
    offers.price,
    org_name
FROM companies,
    offers,
    organizations,
    fields
WHERE companies.comp_name IN (
        SELECT DISTINCT comp_name
        FROM fields,
            companies,
            organizations,
            offers
        WHERE fields.comp_id = companies.id
            AND fields.comp_type = organizations.id
            AND offers.comp_id = companies.id
            AND organizations.org_name = `$user_input`
            AND offers.accepted = 'FALSE'
        GROUP BY comp_name
        HAVING COUNT(offers.comp_id) > 0
    )
    AND fields.comp_id = companies.id
    AND fields.comp_type = organizations.id
    AND offers.org_type = organizations.id
    AND offers.comp_id = companies.id
    AND organizations.org_name = `$user_input`;
-- kullanıcı tarafından kabul edilen teklifin güncellenmesi
UPDATE offers
SET accepted = 'TRUE',
    accepted_by_id = `$user_id`
WHERE id = `$id`;
-- kullanıcıyı silen sorgu (trigger tetikleyecek)
DELETE FROM users
WHERE users.id = `$id`;
-- satın alınan üründen sonra stoğun ve bakiyenin azaltılması
UPDATE balance
SET amount = amount - `$price`
WHERE user_id = `$user_id`;
UPDATE products
SET stock = stock - 1
WHERE id = `$product_id`;
-- kullanıcı bakiyesi
SELECT amount
FROM balance
WHERE user_id = `$id`;