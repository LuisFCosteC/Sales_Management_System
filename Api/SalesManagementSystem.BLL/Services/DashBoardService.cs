using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.EntityFrameworkCore.Query;
using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.DTO;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.BLL.Services
{
    public class DashBoardService : IDashBoardService
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IGenericRepository<Product> _productRespository;
        private readonly IMapper _mapper;

        public DashBoardService(ISaleRepository saleRepository, IGenericRepository<Product> productRespository, IMapper mapper)
        {
            _saleRepository = saleRepository;
            _productRespository = productRespository;
            _mapper = mapper;
        }

        private IQueryable<Sales> returnSales(IQueryable<Sales> tableSales, int subtractNumberDays)
        {
            DateTime? lastDate = tableSales.OrderByDescending(v => v.DateRegistration).Select(v => v.DateRegistration).First();
            lastDate = lastDate.Value.AddDays(subtractNumberDays);
            return tableSales.Where(v => v.DateRegistration.Value.Date >= lastDate.Value.Date);
        }

        private async Task<int> TotalLastWeekSales()
        {
            int total = 0;
            IQueryable<Sales> _salesQuery = await _saleRepository.Consult();

            if(_salesQuery.Count() > 0)
            {
                var tableSales = returnSales(_salesQuery, -7);
                total = tableSales.Count();
            }

            return total;
        }

        private async Task<string> TotalRevenuesLastWeek()
        {
            decimal result = 0;
            IQueryable<Sales> _salesQuery = await _saleRepository.Consult();

            if(_salesQuery.Count() > 0)
            {
                var tableSales = returnSales(_salesQuery, -7);
                result = tableSales.Select(v => v.Total).Sum(v => v.Value);
            }

            return Convert.ToString(result, new CultureInfo("es-COL"));
        }

        private async Task<int> TotalProducts()
        {
            IQueryable<Product> _productQuery = await _productRespository.Consult();
            int total = _productQuery.Count();
            return total;
        }

        private async Task<Dictionary<string, int>> LastWeekSales()
        {
            Dictionary<string, int> result = new Dictionary<string, int>();
            IQueryable<Sales> _salesQuery = await _saleRepository.Consult();

            if(_salesQuery.Count() > )
            {
                var tableSales = returnSales(_salesQuery, -7);
                result = tableSales
                    .GroupBy(v => v.DateRegistration.Value.Date).OrderBy(g => g.Key)
                    .Select(dv => new { date = dv.Key.ToString("dd/MM/yy"), total = dv.Count() })
                    .ToDictionary(keySelector: r => r.date, elementSelector: r => r.total);
            }

            return result;
        }

        public async Task<DashBoardDTO> Summary()
        {
            DashBoardDTO vmDashBoard = new DashBoardDTO();

            try
            {
                vmDashBoard.TotalSales = await TotalLastWeekSales();
                vmDashBoard.TotalRevenues = await TotalRevenuesLastWeek();
                vmDashBoard.TotalProducts = await TotalProducts();

                List<SalesWeekDTO> listSalesWeek = new List<SalesWeekDTO>();

                foreach(KeyValuePair<string, int> item in await LastWeekSales())
                {
                    listSalesWeek.Add(new SalesWeekDTO()
                    {
                        Date = item.Key,
                        Total = item.Value
                    });
                }

                vmDashBoard.LastWeeksSales = listSalesWeek;
            }
            catch
            {
                throw;
            }

            return vmDashBoard;
        }
    }
}
