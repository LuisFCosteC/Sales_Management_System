using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class DashBoardDTO
    {
        public int? TotalSales { get; set; }

        public string? TotalRevenues { get; set; }

        public int TotalProducts { get; set; }

        public List<SalesWeekDTO> LastWeeksSales { get; set; }
    }
}
