USE DB_Sales;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Role(name) 
VALUES 
    ('Administrador'),
    ('Empleado'),
    ('Supervisor');

SELECT * FROM Role;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Users(fullName, email, idRole, password) 
VALUES
    ('Luis F. Coste C.', 'Luis@gmail.com', 1, '123'),
	('Maria C. Pinto R.', 'Maria@gmail.com', 2, '123'),
	('Daniel F. Sanchez C.', 'Daniel@gmail.com', 3, '123');

SELECT * FROM Users;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Category(name, isActive)
VALUES
    ('Portátiles', 1),
    ('Monitores', 1),
    ('Teclados', 1),
    ('Auriculares', 1),
    ('Memoria', 1),
    ('Accesorios', 1);

SELECT * FROM Category;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Product(name, idCategory, stock, price, isActive)
VALUES
    ('Laptop Samsung Book Pro', 1, 20, 2500, 1),
    ('Laptop Lenovo IdeaPad', 1, 30, 2200, 1),
    ('Laptop Asus ZenBook Duo', 1, 30, 2100, 1),
    ('Monitor Gaming Teros', 2, 25, 1050, 1),
    ('Monitor Curvo Samsung', 2, 15, 1400, 1),
    ('Monitor Gamer Huawei', 2, 10, 1350, 1),
    ('Teclado Gamer Seisen', 3, 10, 800, 1),
    ('Teclado Gamer Antryx', 3, 10, 1000, 1),
    ('Teclado Logitech', 3, 10, 1000, 1),
    ('Auriculares Gamer Logitech', 4, 15, 800, 1),
    ('Auriculares Gamer HyperX', 4, 20, 680, 1),
    ('Auriculares RGB Redragon', 4, 35, 950, 1),
    ('Memoria RGB Kingston', 5, 10, 200, 1),
    ('Ventilador Cooler Master', 6, 20, 200, 1),
    ('Ventilador Mini Lenovo', 6, 15, 200, 1);

SELECT * FROM Product;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

INSERT INTO Menu(name, icon, url)
VALUES
    ('Tablero',				'dashboard',			'/pages/dashboard'),
    ('Usuarios',			'group',				'/pages/users'),
    ('Productos',			'collections_bookmark', '/pages/product'),
    ('Ventas',				'currency_exchange',	'/pages/sales'),
    ('Historial de Ventas', 'edit_note',			'/pages/sales-history'),
    ('Reportes',			'receipt',				'/pages/report');

SELECT * FROM Menu;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

---------- Menú para Administrador ----------
INSERT INTO MenuRole(idMenu, idRole)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1);

---------- Menú para Empleado ----------
INSERT INTO MenuRole(idMenu, idRole)
VALUES
    (4, 2),
    (5, 2);

---------- Menú para Supervisor ----------
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