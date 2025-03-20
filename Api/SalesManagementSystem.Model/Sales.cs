using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Sales
{
    public int IdSales { get; set; }

    public string? SalesNumber { get; set; }

    public string? PaymentType { get; set; }

    public decimal? Total { get; set; }

    public DateTime? DateRegistration { get; set; }

    public virtual ICollection<DetailSales> DetailSales { get; set; } = new List<DetailSales>();
}
