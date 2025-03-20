using System;
using System.Collections.Generic;

namespace SalesManagementSystem.Model;

public partial class SalesNumber
{
    public int IdSalesNumber { get; set; }

    public int LastNumber { get; set; }

    public DateTime? DateRegistration { get; set; }
}
