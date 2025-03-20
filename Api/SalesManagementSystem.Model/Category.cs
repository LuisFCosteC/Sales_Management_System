using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Category
{
    public int IdCategory { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? DateRegistration { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
