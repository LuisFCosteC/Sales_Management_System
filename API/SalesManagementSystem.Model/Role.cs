using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Role
{
    public int IdRole { get; set; }

    public string? Name { get; set; }

    public DateTime? DateRegistration { get; set; }

    public virtual ICollection<MenuRole> MenuRoles { get; set; } = new List<MenuRole>();

    public virtual ICollection<Users> Users { get; set; } = new List<Users>();
}
