using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class SalesDTO
    {
        public int IdSales { get; set; }

        public string? SalesNumber { get; set; }

        public string? PaymentType { get; set; }

        public string? TotalText { get; set; }

        public string? DateRegistration { get; set; }

        public virtual ICollection<DetailSalesDTO> DetailSales { get; set; }
    }
}
