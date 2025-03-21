using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class ReportDTO
    {
        public string? SalesNumber { get; set; }

        public string? PaymentType { get; set; }

        public string? DateRegistration { get; set; }

        public string? TotalSales { get; set; }

        public string? Product { get; set; }

        public int? Quantity { get; set; }

        public string? Price { get; set; }

        public string? Total { get; set; }
    }
}
