using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Menu
{
    public int IdMenu { get; set; }

    public string? Name { get; set; }

    public string? Icon { get; set; }

    public string? Url { get; set; }

    public virtual ICollection<MenuRole> MenuRoles { get; set; } = new List<MenuRole>();
}
