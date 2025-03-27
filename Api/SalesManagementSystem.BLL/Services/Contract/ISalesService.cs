using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SalesManagementSystem.DTO;

namespace SalesManagementSystem.BLL.Services.Contract
{
    public interface ISalesService
    {
        Task<SalesDTO> Register(SalesDTO model);
        Task<List<SalesDTO>> History(string searchBy, string salesNumber, string startDate, string endDate);
        Task<List<ReportDTO>> Report(string startDate, string endDate);
    }
}
