using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SalesManagementSystem.BLL.Services;
using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.DAL.DBContext;
using SalesManagementSystem.DAL.Repositories;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.Utility;

namespace SalesManagementSystem.IOC
{
    public static class Dependency
    {
        public static void InjectDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DbSalesContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("stringSQL"));
            });

            // Dependency of Repositories

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<ISaleRepository, SaleRepository>();

            // Dependency of AutoMapper 

            services.AddAutoMapper(typeof(AutoMapperProfile));

            // Dependency of Services BLL

            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ISalesService, SalesService>();
            services.AddScoped<IDashBoardService, DashBoardService>();
            services.AddScoped<IMenuService, MenuService>();

        }
    }
}
