using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SalesManagementSystem.DAL.DBContext;

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
        }
    }
}
