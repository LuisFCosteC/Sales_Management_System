using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class DetailSalesDTO
    {
        public int? IdProduct { get; set; }

        public string? ProductDescription { get; set; }

        public int? Quantity { get; set; }

        public string? PriceText { get; set; }

        public string? TotalText { get; set; }
    }
}
