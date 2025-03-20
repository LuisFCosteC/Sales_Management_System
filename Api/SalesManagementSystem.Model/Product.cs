using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Product
{
    public int IdProduct { get; set; }

    public string? Name { get; set; }

    public int? IdCategory { get; set; }

    public int? Stock { get; set; }

    public decimal? Price { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? DateRegistration { get; set; }

    public virtual ICollection<DetailSales> DetailSales { get; set; } = new List<DetailSales>();

    public virtual Category? IdCategoryNavigation { get; set; }
}
