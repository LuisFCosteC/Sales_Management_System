using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.BLL.Services.Contract
{
    public interface IRoleService
    {
        Task<List<RoleDTO>> List();
    }
}
