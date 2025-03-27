using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.DTO;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.BLL.Services
{
    public class SalesService 
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IGenericRepository<DetailSales> _datailsalesRespository;
        private readonly IMapper _mapper;

        public SalesService(ISaleRepository saleRepository, IGenericRepository<DetailSales> datailsalesRespository, IMapper mapper)
        {
            _saleRepository = saleRepository;
            _datailsalesRespository = datailsalesRespository;
            _mapper = mapper;
        }

        public async Task<SalesDTO> Register(SalesDTO model)
        {
            try
            {
                var salesGenerated = await _saleRepository.Register(_mapper.Map<Sales>(model));

                if (salesGenerated.IdSales == 0)
                    throw new TaskCanceledException("Could not be created // No se pudo crear");

                return _mapper.Map<SalesDTO>(salesGenerated);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<SalesDTO>> History(string searchBy, string salesNumber, string startDate, string endDate)
        {
            IQueryable<Sales> query = await _saleRepository.Consult();
            var ListResult = new List<Sales>();

            try
            {
                if(searchBy == "date")
                {
                    DateTime date_Start = DateTime.ParseExact(startDate, "dd/MM/yyyy", new CultureInfo("es-COL"));
                    DateTime date_End = DateTime.ParseExact(endDate, "dd/MM/yyyy", new CultureInfo("es-COL"));

                    ListResult = await query.Where(v =>
                        v.DateRegistration.Value.Date >= date_Start.Date &&
                        v.DateRegistration.Value.Date <= date_End.Date
                    ).Include(ds => ds.DetailSales)
                    .ThenInclude(p => p.IdProductNavigation)
                    .ToListAsync();
                }
                else
                {
                    ListResult = await query.Where(v => v.SalesNumber == salesNumber)
                    .Include(ds => ds.DetailSales)
                    .ThenInclude(p => p.IdProductNavigation)
                    .ToListAsync();
                }
            }
            catch
            {
                throw;
            }

            return _mapper.Map<List<SalesDTO>>(ListResult);
        }

        public async Task<List<ReportDTO>> Report(string startDate, string endDate)
        {
            IQueryable<DetailSales> query = await _datailsalesRespository.Consult();
            var ListResult = new List<DetailSales>();

            try
            {
                DateTime date_Start = DateTime.ParseExact(startDate, "dd/MM/yyyy", new CultureInfo("es-COL"));
                DateTime date_End = DateTime.ParseExact(endDate, "dd/MM/yyyy", new CultureInfo("es-COL"));

                ListResult = await query
                    .Include(p => p.IdProductNavigation)
                    .Include(s => s.IdSalesNavigation)
                    .Where(dv =>
                        dv.IdSalesNavigation.DateRegistration.Value.Date >= date_Start.Date &&
                        dv.IdSalesNavigation.DateRegistration.Value.Date <= date_End.Date
                    ).ToListAsync();
            }
            catch
            {
                throw;
            }

            return _mapper.Map<List<ReportDTO>>(ListResult);
        }
    }
}
