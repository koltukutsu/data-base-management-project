-- kullanıcıyı id'sini sequence kullanarak oluşturup listeye ekler
INSERT INTO users (id, username, pw)
VALUES (nextval('users_id_seq'), `$username`, `password`);
-- kullanıcının silinmesi
DELETE FROM users
WHERE id = `$user_id`;
-- except kullanarak girilen parametreleri için açıktaki teklifleri listeler
SELECT MIN(offer_view.id), comp_name,
    MIN(price)
FROM offer_view
WHERE org_name = `$org_name`
    AND time_period = `$time`
    AND max_guest_count >= `$guest_count`
GROUP BY(comp_name)
EXCEPT
SELECT MIN(ow.id), comp_name,
    MIN(ow.price)
FROM offer_view ow,
    offers
WHERE offers.accepted = 'TRUE'
    AND offers.id = ow.id
GROUP BY(comp_name);
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
