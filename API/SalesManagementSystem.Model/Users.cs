using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class Users
{
    public int IdUsers { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public int? IdRole { get; set; }

    public string? Password { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? DateRegistration { get; set; }

    public virtual Role? IdRoleNavigation { get; set; }
}
