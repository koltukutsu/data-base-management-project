-- Inserting Data into Users Table --
INSERT INTO users (username, pw) VALUES ('user1', 'pw1');
INSERT INTO users (username, pw) VALUES ('user2', 'pw2');
INSERT INTO users (username, pw) VALUES ('user3', 'pw3');
INSERT INTO users (username, pw) VALUES ('user4', 'pw4');
INSERT INTO users (username, pw) VALUES ('user5', 'pw5');
INSERT INTO users (username, pw) VALUES ('user6', 'pw6');
INSERT INTO users (username, pw) VALUES ('user7', 'pw7');
INSERT INTO users (username, pw) VALUES ('user8', 'pw8');
INSERT INTO users (username, pw) VALUES ('user9', 'pw9');
INSERT INTO users (username, pw) VALUES ('user10', 'pw10');
--------------------------------------------------------------------
-- Inserting Data into Organizations Table --
INSERT INTO organizations (id, org_name) VALUES (1, 'Dogum Gunu');
INSERT INTO organizations (id, org_name) VALUES (2, 'Dugun');
INSERT INTO organizations (id, org_name) VALUES (3, 'Mezuniyet');
INSERT INTO organizations (id, org_name) VALUES (4, 'Yilbasi');
INSERT INTO organizations (id, org_name) VALUES (5, 'Konser');
INSERT INTO organizations (id, org_name) VALUES (6, 'Kostum Partisi');
INSERT INTO organizations (id, org_name) VALUES (7, 'Mangal Partisi');
INSERT INTO organizations (id, org_name) VALUES (8, 'Kamp');
INSERT INTO organizations (id, org_name) VALUES (9, 'Yemekli Toplanti');
INSERT INTO organizations (id, org_name) VALUES (10, 'Acik Hava Sinemasi');
---------------------------------------------------------------------------
-- Inserting Data into Companies Table --
INSERT INTO companies (id, comp_name) VALUES (1, 'Celebration Coalition');
INSERT INTO companies (id, comp_name) VALUES (2, 'Happening Haven');
INSERT INTO companies (id, comp_name) VALUES (3, 'Party Pinnacle');
INSERT INTO companies (id, comp_name) VALUES (4, 'Merrymaker''s Alliance');
INSERT INTO companies (id, comp_name) VALUES (5, 'Carnival Collective');
INSERT INTO companies (id, comp_name) VALUES (6, 'Event Pros Co.');
INSERT INTO companies (id, comp_name) VALUES (7, 'Summit Scape Events');
INSERT INTO companies (id, comp_name) VALUES (8, 'Corporate Connect Affairs');
INSERT INTO companies (id, comp_name) VALUES (9, 'Gala Minds Productions');
INSERT INTO companies (id, comp_name) VALUES (10, 'Nexus Nest Gatherings');
-------------------------------------------------------------------------
-- Inserting Data into Fields Table --
-- dogum gunu
INSERT INTO fields (comp_id, comp_type) VALUES (1, 1);
INSERT INTO fields (comp_id, comp_type) VALUES (2, 1);
INSERT INTO fields (comp_id, comp_type) VALUES (3, 1);
INSERT INTO fields (comp_id, comp_type) VALUES (4, 1);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 1);

-- dugun
INSERT INTO fields (comp_id, comp_type) VALUES (1, 2);
INSERT INTO fields (comp_id, comp_type) VALUES (2, 2);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 2);
INSERT INTO fields (comp_id, comp_type) VALUES (6, 2);
INSERT INTO fields (comp_id, comp_type) VALUES (8, 2);

-- mezuniyet
INSERT INTO fields (comp_id, comp_type) VALUES (1, 3);
INSERT INTO fields (comp_id, comp_type) VALUES (3, 3);
INSERT INTO fields (comp_id, comp_type) VALUES (4, 3);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 3);
INSERT INTO fields (comp_id, comp_type) VALUES (9, 3);

-- yilbasi
INSERT INTO fields (comp_id, comp_type) VALUES (4, 4);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 4);
INSERT INTO fields (comp_id, comp_type) VALUES (7, 4);
INSERT INTO fields (comp_id, comp_type) VALUES (9, 4);
INSERT INTO fields (comp_id, comp_type) VALUES (10, 4);

-- konser
INSERT INTO fields (comp_id, comp_type) VALUES (1, 5);
INSERT INTO fields (comp_id, comp_type) VALUES (3, 5);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 5);
INSERT INTO fields (comp_id, comp_type) VALUES (6, 5);
INSERT INTO fields (comp_id, comp_type) VALUES (7, 5);

-- kostum partisi
INSERT INTO fields (comp_id, comp_type) VALUES (1, 6);
INSERT INTO fields (comp_id, comp_type) VALUES (2, 6);
INSERT INTO fields (comp_id, comp_type) VALUES (3, 6);
INSERT INTO fields (comp_id, comp_type) VALUES (4, 6);
INSERT INTO fields (comp_id, comp_type) VALUES (8, 6);
INSERT INTO fields (comp_id, comp_type) VALUES (10, 6);

-- mangal partisi
INSERT INTO fields (comp_id, comp_type) VALUES (3, 7);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 7);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 7);
INSERT INTO fields (comp_id, comp_type) VALUES (6, 7);
INSERT INTO fields (comp_id, comp_type) VALUES (9, 7);
INSERT INTO fields (comp_id, comp_type) VALUES (10, 7);

--kamp
INSERT INTO fields (comp_id, comp_type) VALUES (3, 8);
INSERT INTO fields (comp_id, comp_type) VALUES (4, 8);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 8);
INSERT INTO fields (comp_id, comp_type) VALUES (7, 8);
INSERT INTO fields (comp_id, comp_type) VALUES (8, 8);

-- yemekli toplanti
INSERT INTO fields (comp_id, comp_type) VALUES (1, 9);
INSERT INTO fields (comp_id, comp_type) VALUES (2, 9);
INSERT INTO fields (comp_id, comp_type) VALUES (7, 9);

-- acik hava sinemasi
INSERT INTO fields (comp_id, comp_type) VALUES (2, 10);
INSERT INTO fields (comp_id, comp_type) VALUES (3, 10);
INSERT INTO fields (comp_id, comp_type) VALUES (5, 10);
INSERT INTO fields (comp_id, comp_type) VALUES (9, 10);
-------------------------------------------------------
-- Inserting Data into Offers Table --
-- dogum gunu
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 10, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 100, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 10, 'Yaz', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 100, 'Yaz', 5000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 10, 'Sonbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 100, 'Sonbahar', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 10, 'Kis', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 1, 100, 'Kis', 2000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 50, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 200, 'Ilkbahar', 6000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 50, 'Yaz', 5000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 200, 'Yaz', 8000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 50, 'Sonbahar', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 1, 200, 'Sonbahar', 4500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 1, 20, 'Ilkbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 1, 150, 'Ilkbahar', 2200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 1, 20, 'Yaz', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 1, 150, 'Yaz', 3000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 1, 10, 'Ilkbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 1, 100, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 1, 10, 'Sonbahar', 700.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 1, 100, 'Sonbahar', 1500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 1, 50, 'Yaz', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 1, 200, 'Yaz', 5000.00);

-- dugun
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 2, 200, 'Ilkbahar', 5000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 2, 300, 'Ilkbahar', 6000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 2, 300, 'Yaz', 7000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 2, 400, 'Yaz', 8000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 2, 200, 'Yaz', 7000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 2, 400, 'Yaz', 9000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 2, 100, 'Ilkbahar', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 2, 200, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 2, 100, 'Yaz', 5000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 2, 300, 'Yaz', 6000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 2, 100, 'Yaz', 5200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 2, 200, 'Yaz', 6000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 2, 100, 'Sonbahar', 4300.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 2, 200, 'Sonbahar', 5000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 2, 120, 'Kis', 3200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 2, 180, 'Kis', 3500.00);

-- mezuniyet
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 3, 1000, 'Yaz', 10000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 3, 2000, 'Yaz', 15000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 3, 800, 'Yaz', 8000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 3, 1500, 'Yaz', 12000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 3, 1000, 'Yaz', 9000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 3, 1500, 'Yaz', 11500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 3, 500, 'Yaz', 8500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 3, 3000, 'Yaz', 18000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 3, 1200, 'Ilkbahar', 7000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 3, 1500, 'Yaz', 12000.00);

-- yilbasi
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 4, 50, 'Kis', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 4, 30, 'Kis', 800.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 4, 70, 'Kis', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 4, 30, 'Kis', 600.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 4, 50, 'Kis', 1200.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 4, 20, 'Kis', 700.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 4, 50, 'Kis', 900.00);

-- konser
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 5, 2000, 'Ilkbahar', 5000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 5, 2000, 'Yaz', 10000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 5, 1500, 'Sonbahar', 4000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 5, 2200, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 5, 3000, 'Ilkbahar', 4500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 5, 1000, 'Kis', 2000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 5, 2000, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 5, 2500, 'Yaz', 12000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 5, 2000, 'Sonbahar', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 5, 1500, 'Kis', 2000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 5, 1000, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 5, 1600, 'Sonbahar', 2500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 5, 1500, 'Ilkbahar', 3500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 5, 1500, 'Yaz', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 5, 1500, 'Sonbahar', 3000.00);

-- kostum partisi
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 10, 'Ilkbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 50, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 10, 'Yaz', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 50, 'Yaz', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 10, 'Sonbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 50, 'Sonbahar', 1300.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 30, 'Kis', 800.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 6, 50, 'Kis', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 6, 50, 'Ilkbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 6, 70, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 6, 50, 'Sonbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 6, 70, 'Sonbahar', 1200.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 6, 80, 'Yaz', 3000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 6, 50, 'Ilkbahar', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 6, 50, 'Ilkbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 6, 80, 'Yaz', 2000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 6, 30, 'Kis', 800.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 6, 50, 'Kis', 1000.00);

-- mangal partisi
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 7, 20, 'Ilkbahar', 600.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 7, 20, 'Yaz', 500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 7, 20, 'Sonbahar', 450.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 7, 10, 'Ilkbahar', 400.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 7, 15, 'Yaz', 500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (6, 7, 10, 'Yaz', 500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 7, 10, 'Ilkbahar', 500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 7, 10, 'Yaz', 700.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 7, 10, 'Sonbahar', 400.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 7, 12, 'Yaz', 600.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (10, 7, 15, 'Yaz', 800.00);

--kamp
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 20, 'Ilkbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 30, 'Ilkbahar', 2200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 20, 'Yaz', 2500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 30, 'Yaz', 3500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 20, 'Sonbahar', 3200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 30, 'Sonbahar', 3400.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 20, 'Kis', 3100.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 8, 30, 'Kis', 3500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 8, 10, 'Ilkbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 8, 20, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 8, 10, 'Sonbahar', 700.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (4, 8, 20, 'Sonbahar', 1500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 20, 'Ilkbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 50, 'Ilkbahar', 2200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 20, 'Yaz', 2400.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 50, 'Yaz', 3600.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 20, 'Sonbahar', 3100.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 50, 'Sonbahar', 3800.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 20, 'Kis', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 8, 50, 'Kis', 4000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 8, 20, 'Yaz', 2500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 8, 50, 'Yaz', 4200.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 8, 30, 'Ilkbahar', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 8, 50, 'Ilkbahar', 4000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 8, 30, 'Kis', 6000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (8, 8, 50, 'Kis', 9000.00);

-- yemekli toplanti
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 9, 20, 'Sonbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (1, 9, 20, 'Ilkbahar', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 9, 20, 'Sonbahar', 1000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 9, 20, 'Ilkbahar', 1000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 9, 20, 'Yaz', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (7, 9, 20, 'Kis', 2000.00);

--acikhavasineması
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 10, 50, 'Yaz', 3000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (2, 10, 100, 'Yaz', 3500.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 10, 20, 'Ilkbahar', 1500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 10, 60, 'Ilkbahar', 2200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 10, 30, 'Yaz', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (3, 10, 70, 'Yaz', 3000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 10, 50, 'Ilkbahar', 2000.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (5, 10, 70, 'Yaz', 3000.00);

INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 10, 70, 'Ilkbahar', 2500.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 10, 70, 'Yaz', 3200.00);
INSERT INTO offers (comp_id, org_type, max_guest_count, time_period, price) VALUES (9, 10, 70, 'Sonbahar', 2000.00);
---------------------------------------------------------------------------------------------------------------------
-- Inserting Data into Products Table --
-- dogum gunu
INSERT INTO products (id, product_name, product_type) VALUES (1, 'Dogum Gunu Pastasi', 1);
INSERT INTO products (id, product_name, product_type) VALUES (2, 'Pasta Susu', 1);
INSERT INTO products (id, product_name, product_type) VALUES (3, 'Parti Malzemeleri', 1);

-- dugun
INSERT INTO products (id, product_name, product_type) VALUES (4, 'Dugun Pastasi', 2);
INSERT INTO products (id, product_name, product_type) VALUES (5, 'Muzik Grubu', 2);
INSERT INTO products (id, product_name, product_type) VALUES (6, 'Yemek', 2);

-- mezuniyet
INSERT INTO products (id, product_name, product_type) VALUES (7, 'Kep', 3);
INSERT INTO products (id, product_name, product_type) VALUES (8, 'Yemek', 3);

-- yilbasi
INSERT INTO products (id, product_name, product_type) VALUES (9, 'Yilbasi Agaci', 4);
INSERT INTO products (id, product_name, product_type) VALUES (10, 'Parti Malzemeleri', 4);
INSERT INTO products (id, product_name, product_type) VALUES (11, 'Sapka', 4);
INSERT INTO products (id, product_name, product_type) VALUES (12, 'Yiyecek ve Icecek', 4);

-- konser
INSERT INTO products (id, product_name, product_type) VALUES (13, 'DJ', 5);
INSERT INTO products (id, product_name, product_type) VALUES (14, 'Isikli Gosteri', 5);

-- kostum partisi
INSERT INTO products (id, product_name, product_type) VALUES (15, 'Kostum', 6);
INSERT INTO products (id, product_name, product_type) VALUES (16, 'Atistirmalik', 6);
INSERT INTO products (id, product_name, product_type) VALUES (17, 'Yiyecek ve Icecek', 6);

-- mangal partisi
INSERT INTO products (id, product_name, product_type) VALUES (18, 'Yemek', 7);
INSERT INTO products (id, product_name, product_type) VALUES (19, 'Mangal', 7);
INSERT INTO products (id, product_name, product_type) VALUES (20, 'Yemek Malzemeleri', 7);
INSERT INTO products (id, product_name, product_type) VALUES (21, 'YemekMasasi', 7);

--kamp
INSERT INTO products (id, product_name, product_type) VALUES (22, 'Cadir', 8);
INSERT INTO products (id, product_name, product_type) VALUES (23, 'Uyku Tulumu', 8);
INSERT INTO products (id, product_name, product_type) VALUES (24, 'Kamp Malzemeleri', 8);

-- yemekli toplanti
INSERT INTO products (id, product_name, product_type) VALUES (25, 'Sunum Tahtasi', 9);
INSERT INTO products (id, product_name, product_type) VALUES (26, 'Projesiyon', 9);

-- acik hava sinemasi
INSERT INTO products (id, product_name, product_type) VALUES (27, 'Minder', 10);
INSERT INTO products (id, product_name, product_type) VALUES (28, 'Yastik', 10);
INSERT INTO products (id, product_name, product_type) VALUES (29, 'Sandalye', 10);