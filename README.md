# Sales Management System
This project is a sales system that manages the sale of products through a software architecture that includes a database, where all the necessary tables are stored. It uses ASP.NET Core Web API for the implementation of its API, structured in layers that include business logic (BLL), data access (DAL), models (Model), and utilities (Utility). The system allows to perform CRUD operations on products and sales, manage users and roles, and generate sales reports, all through a friendly and accessible user interface. In addition, dependency injection is implemented to facilitate scalability and code maintenance.

# Project Structure

The project consists of the following main files:

### **1. Back-End (`Data Base`)**

- **Database:**
  - Name: `DB_Sales`
  - Tables created:
    - Role
    - Menu
    - MenuRole
    - Users
    - Category
    - Product
    - SalesNumber
    - Sales
    - DetailSales
- **Technologies:**
  - Microsoft SQL Server (SQLEXPRESS).
  - Entity Framework Core for entity mapping.

### **2. API (Back-End)**

- **Layered Architecture:**
  - **SalesManagementSystem.API:** Main project (ASP.NET Core Web API).
  - **Additional layers:**
    - `BLL` (Business Logic).
    - `DAL` (Data Access).
    - `DTO` (Data Transfer).
    - `IOC` (Inversion of Control).
    - `Model` (Data Models).
    - `Utility` (Utilities).
  - **Functionalities:**
    - **Connection to the DB:** Configuration through DbContext and connection string in appsettings.json.
    - **Repositories:**
      - `GenericRepository`: Implements generic CRUD operations.
      - `SaleRepository`: Specific logic for sales (registration, history, reports).
    - **Services:**
      - `RoleService`
      - `UsersService`
      - `CategoryService`
      - `ProductService`
      - `SalesService`
      - etc.
    - **AutoMapper:** To map between models and DTOs.
    - **Endpoints:**
      - Example: `/api/Users/List`, `/api/Sales/Register`.
  - **Technologies:**
    - ASP.NET Core.
    - Entity Framework Core.
    - AutoMapper.
    - Dependency Injection.

### **3. Front-End (Angular)**
  - **Project Structure:**
    - **Modules:**
      - `SharedModule`: Reusable components (Angular Material).
      - `LayoutModule`: Contains the main pages (Dashboard, Users, Products, Sales, etc.).
    - **Components:**
      - `Login`: User authentication.
      - `Layout`: Main container with side menu.
      - `Pages`: Dashboard, Users, Product, Sales, SalesHistory, Report.
    - **Services:**
      - `UsersService`, `RoleService`, `CategoryService`, etc., to consume the API.
      - `UtilityService`: common functionalities (alerts, session management).
  - **Technologies:**
    - Angular 16+.
    - Angular Material for UI.
    - Additional libraries:
        - SweetAlert2 for notifications.
        - Moment.js for date management.
        - Chart.js for charts.
        - xlsx for exporting data to Excel.
  - **Authentication Flow:**
    - Login → Save session to `localStorage` → Navigation to `/pages/dashboard`.
  - **Features:**
    - Reactive forms.
    - Modals for CRUD (example: modalUsers).
    - Lazy Loading for optimization.
   
### 4. General Architecture Diagram
![image](https://github.com/user-attachments/assets/dd7a52b5-a224-4215-a214-c6be72c86159)

