CREATE DATABASE DB_Sales;

USE DB_Sales;

CREATE TABLE Role(
    idRole INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50),
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE Menu(
    idMenu INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50),
    icon VARCHAR(50),
    url VARCHAR(50)
);

CREATE TABLE MenuRole(
    idMenuRole INT PRIMARY KEY IDENTITY(1,1),
    idMenu INT REFERENCES Menu(idMenu),
    idRole INT REFERENCES Role(idRole)
);

CREATE TABLE Users(
    idUsers INT PRIMARY KEY IDENTITY(1,1),
    fullName VARCHAR(100),
    email VARCHAR(40),
    idRole INT REFERENCES Role(idRole),
    password VARCHAR(40),
    isActive BIT DEFAULT 1,
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE Category(
    idCategory INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50),
    isActive BIT DEFAULT 1,
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE Product(
    idProduct INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50),
    idCategory INT REFERENCES Category(idCategory),
    stock INT,
    price DECIMAL(10,2),
    isActive BIT DEFAULT 1,
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE SalesNumber(
    idSalesNumber INT PRIMARY KEY IDENTITY(1,1),
    last_Number INT NOT NULL,
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE Sales(
    idSales INT PRIMARY KEY IDENTITY(1,1),
    salesNumber VARCHAR(40),
    paymentType VARCHAR(50),
    total DECIMAL(10,2),
    dateRegistration DATETIME DEFAULT GETDATE()
);

CREATE TABLE DetailSales(
    idDetailSales INT PRIMARY KEY IDENTITY(1,1),
    idSales INT REFERENCES Sales(idSales),
    idProduct INT REFERENCES Product(idProduct),
    quantity INT,
    price DECIMAL(10,2),
    total DECIMAL(10,2)
);


DROP TABLE IF EXISTS DetailSales;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS MenuRole;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS SalesNumber;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Role;