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

<div align="center">
  <img src="https://github.com/user-attachments/assets/dd7a52b5-a224-4215-a214-c6be72c86159" width="600">
</div>

# Requirements and Facilities for the “Sales Management System” Project

### 1. System Requirements

  - **Back-End (API in ASP.NET Core):**
    - **Database:** SQL Server (local or remote).
    - **Development Environment:** Visual Studio 2022 or higher.
    - **SDK:** .NET 6.0 or higher.
    - **NuGet packages:**
      - `Microsoft.EntityFrameworkCore.SqlServer`
      - `Microsoft.EntityFrameworkCore.Tools`
      - `AutoMapper`
      - `AutoMapper.Extensions.Microsoft.DependencyInjection`
    - **Server:** SQL Server Express (for local development).
  - Front-End (Angular):
    - **Node.js:** Version 16.x or higher.
    - **Angular CLI:** Latest stable version.
    - **Browser:** Chrome, Firefox, Edge (latest versions).
    - **Dependencies:**
      - `@angular/material` (UI components).
      - `sweetalert2` (alerts).
      - `moment` (date management).
      - `chart.js` (charts).
      - `xlsx` (Excel manipulation).

### 2. Necessary Facilities

  - **Back-End:**
    - **Database:**
      - Install **SQL Server Express** (or use an existing instance).
      - Execute the SQL script to create the `DB_Sales` database and the mentioned tables.
    - **Development Environment:**
      - Install **Visual Studio 2022** with workloads:
        - ASP.NET and web development.
        - .NET desktop development.
    - **NuGet packages (run in Visual Studio):**
      
      ````bash
      Install-Package Microsoft.EntityFrameworkCore.SqlServer
      Install-Package Microsoft.EntityFrameworkCore.Tools
      Install-Package AutoMapper
      Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection
      ````
    - **Configuration:**
      - Update connection string in `appsettings.json`:
  - **Front-End:**
    - **Node.js and Angular CLI:**
      
      ````bash
      npm install -g @angular/cli
      ````
      
    - **Create Angular Project:**

      ````bash
      ng new FRONT-END
      cd FRONT-END
      ````
    
    - **Install Dependencies:**

      ````bash
      ng add @angular/material
      npm install sweetalert2@11.6.16
      npm install moment --save
      npm install @angular/material-moment-adapter
      npm install chart.js
      npm install xlsx
      ````

    - **Configuration:**
      - Update environment.ts with API URL:
        
        ````bash
        export const environment = {
          production: false,
          endpoint: "http://localhost:5208/api/"
        };
        ````

### 3. Additional Configuration

  - **CORS**: Enable in `Program.cs` (Back-End):
  
    ````bash
    builder.Services.AddCors(options => {
      options.AddPolicy("NewPolicy", app => {
          app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
      });
    });
    app.UseCors("NewPolicy");
    ````
    
  - **AutoMapper**: Configure profiles in `AutoMapperProfile.cs` (Back-End) and `shared.module.ts` (Front-End).

### 4. Project Execution
  
  - Back-End:
    - Execute the API from Visual Studio (F5).
  - Front-End:

    ````bash
    ng serve -o
    ````

# Presentation of the site


