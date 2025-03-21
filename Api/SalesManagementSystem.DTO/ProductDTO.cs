using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class ProductDTO
    {
        public int IdProduct { get; set; }

        public string? Name { get; set; }

        public int? IdCategory { get; set; }

        public string? CategoryDescription { get; set; }

        public int? Stock { get; set; }

        public string? Price { get; set; }

        public int? IsActive { get; set; }
    }
}
