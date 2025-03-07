using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class MenuRole
{
    public int IdMenuRole { get; set; }

    public int? IdMenu { get; set; }

    public int? IdRole { get; set; }

    public virtual Menu? IdMenuNavigation { get; set; }

    public virtual Role? IdRoleNavigation { get; set; }
}
