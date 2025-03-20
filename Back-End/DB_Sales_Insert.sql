USE DB_Sales;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Role(name) 
VALUES 
    ('Administrator'),
    ('Employee'),
    ('Supervisor');

SELECT * FROM Role;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Users(fullName, email, idRole, password) 
VALUES
    ('student code', 'code@example.com', 1, '123');

SELECT * FROM Users;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Category(name, isActive)
VALUES
    ('Laptops', 1),
    ('Monitors', 1),
    ('Keyboards', 1),
    ('Headphones', 1),
    ('Memory', 1),
    ('Accessories', 1);

SELECT * FROM Category;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Product(name, idCategory, stock, price, isActive)
VALUES
    ('Samsung Book Pro Laptop', 1, 20, 2500, 1),
    ('Lenovo IdeaPad Laptop', 1, 30, 2200, 1),
    ('Asus ZenBook Duo Laptop', 1, 30, 2100, 1),
    ('Teros Gaming Monitor', 2, 25, 1050, 1),
    ('Samsung Curved Monitor', 2, 15, 1400, 1),
    ('Huawei Gamer Monitor', 2, 10, 1350, 1),
    ('Seisen Gamer Keyboard', 3, 10, 800, 1),
    ('Antryx Gamer Keyboard', 3, 10, 1000, 1),
    ('Logitech Keyboard', 3, 10, 1000, 1),
    ('Logitech Gamer Headset', 4, 15, 800, 1),
    ('HyperX Gamer Headset', 4, 20, 680, 1),
    ('Redragon RGB Headset', 4, 35, 950, 1),
    ('Kingston RGB Memory', 5, 10, 200, 1),
    ('Cooler Master Fan', 6, 20, 200, 1),
    ('Lenovo Mini Fan', 6, 15, 200, 1);

SELECT * FROM Product;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Menu(name, icon, url)
VALUES
    ('Dashboard', 'dashboard', '/pages/dashboard'),
    ('Users', 'group', '/pages/users'),
    ('Products', 'collections_bookmark', '/pages/products'),
    ('Sales', 'currency_exchange', '/pages/sales'),
    ('Sales History', 'edit_note', '/pages/sales_history'),
    ('Reports', 'receipt', '/pages/reports');

SELECT * FROM Menu;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

---------- Menu for Administrator ----------
INSERT INTO MenuRole(idMenu, idRole)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1);

---------- Menu for Employee ----------
INSERT INTO MenuRole(idMenu, idRole)
VALUES
    (4, 2),
    (5, 2);

---------- Menu for Supervisor ----------
INSERT INTO MenuRole(idMenu, idRole)
VALUES
    (3, 3),
    (4, 3),
    (5, 3),
    (6, 3);

SELECT * FROM MenuRole;
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO SalesNumber(last_Number, dateRegistration)
VALUES
    (0, GETDATE());

SELECT * FROM SalesNumber;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------