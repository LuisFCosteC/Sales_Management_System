using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.DAL.DBContext;
using SalesManagementSystem.Model;
0
namespace SalesManagementSystem.DAL.Repositories
{
    public class SaleRepository : GenericRepository<Sales>, ISaleRepository
    {
        private readonly DbSalesContext _dbcontext;
        public SaleRepository(DbSalesContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<Sales> Register(Sales model)
        {
            Sales salesGenerated = new Sales();

            using (var transaction = _dbcontext.Database.BeginTransaction())
            {
                try
                {
                    // Interaction with the products within Retail Sales
                    foreach (DetailSales ds in model.DetailSales)
                    {
                        Product product_found = _dbcontext.Product.Where(p => p.IdProduct == ds.IdProduct).First();
                        product_found.Stock = product_found.Stock - ds.Quantity;
                        _dbcontext.Product.Update(product_found);
                    }

                    await _dbcontext.SaveChangesAsync();

                    // Sales number generation

                    SalesNumber correlative = _dbcontext.SalesNumber.First();
                    correlative.LastNumber = correlative.LastNumber + 1;
                    correlative.DateRegistration = DateTime.Now;
                    _dbcontext.SalesNumber.Update(correlative);
                    await _dbcontext.SaveChangesAsync();

                    // Sales number format generation

                    int NumberDigits = 4;
                    string zeros = string.Concat(Enumerable.Repeat("0", NumberDigits));
                    string salesNumber = zeros + correlative.LastNumber.ToString();
                    salesNumber = salesNumber.Substring(salesNumber.Length - NumberDigits, NumberDigits);

                    // Updating of the sales nuber in the sale

                    model.SalesNumber = salesNumber;
                    await _dbcontext.Sales.AddAsync(model);
                    await _dbcontext.SaveChangesAsync();
                    salesGenerated = model;

                    // Commit transaction
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                    throw;
                }
                
                return salesGenerated;
            }
        }
    }
}
