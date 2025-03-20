using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.DAL.Repositories.Contract
{
    public interface ISaleRepository : IGenericRepository<Sales>
    {
        Task<Sales> Register(Sales model);
    }
}
