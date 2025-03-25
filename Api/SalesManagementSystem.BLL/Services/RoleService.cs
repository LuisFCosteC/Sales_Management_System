using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.DTO;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.BLL.Services
{
    public class RoleService : IRoleService
    {
        private readonly IGenericRepository<Role> _roleRespository;
        private readonly IMapper _mapper;

        public RoleService(IGenericRepository<Role> roleRespository, IMapper mapper)
        {
            _roleRespository = roleRespository;
            _mapper = mapper;
        }

        public async Task<List<RoleDTO>> List()
        {
            try
            {
                var roleList = await _roleRespository.Consult();
                return _mapper.Map<List<RoleDTO>>(roleList.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
