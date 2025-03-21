using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class SessionDTO
    {
        public int IdUsers { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? RoleDescription { get; set; }
    }
}
