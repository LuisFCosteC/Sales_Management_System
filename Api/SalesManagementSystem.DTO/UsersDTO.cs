﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DTO
{
    public class UsersDTO
    {
        public int IdUsers { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public int? IdRole { get; set; }

        public string? RoleDescription { get; set; }

        public string? Password { get; set; }

        public int? IsActive { get; set; }
    }
}
