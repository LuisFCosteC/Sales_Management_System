using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class DetailSales
{
    public int IdDetailSales { get; set; }

    public int? IdSales { get; set; }

    public int? IdProduct { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public decimal? Total { get; set; }

    public virtual Product? IdProductNavigation { get; set; }

    public virtual Sales? IdSalesNavigation { get; set; }
}
