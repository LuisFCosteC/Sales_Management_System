using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.BLL.Services.Contract
{
    public interface IUsersService
    {
        Task<List<UsersDTO>> List();
        Task<SessionDTO> ValidateCredentials(string email, string password);
        Task<UsersDTO> Create(UsersDTO model);
        Task<bool> Edit(UsersDTO model);
        Task<bool> Delete(int id);
    }
}
