    -- TAMAMDIR
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
            AND organizations.org_name = `$org_name`
            AND offers.accepted = 'FALSE'
        GROUP BY companies.comp_name
        HAVING COUNT(offers.comp_id) > 0
    );
-- kullanıcı tarafından kabul edilen teklifin güncellenmesi
UPDATE offers
SET accepted = 'TRUE',
    accepted_by_id = `$user_id`
WHERE id = `$id`;
-- kullanıcıyı silen sorgu (trigger tetikleyecek)
DELETE FROM users
WHERE users.id = `$id`;