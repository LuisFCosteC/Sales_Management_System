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
    public class MenuService : IMenuService
    {
        private readonly IGenericRepository<Users> _usersRespository;
        private readonly IGenericRepository<MenuRole> _menuRoleRespository;
        private readonly IGenericRepository<Menu> _menuRespository;
        private readonly IMapper _mapper;

        public MenuService(IGenericRepository<Users> usersRespository, IGenericRepository<MenuRole> menuRoleRespository, IGenericRepository<Menu> menuRespository, IMapper mapper)
        {
            _usersRespository = usersRespository;
            _menuRoleRespository = menuRoleRespository;
            _menuRespository = menuRespository;
            _mapper = mapper;
        }

        public async Task<List<MenuDTO>> List(int idUsers)
        {
            IQueryable<Users> tbUsers = await _usersRespository.Consult(u => u.IdUsers == idUsers);
            IQueryable<MenuRole> tbMenuRole = await _menuRoleRespository.Consult();
            IQueryable<Menu> tbMenu = await _menuRespository.Consult();

            try
            {
                IQueryable<Menu> tbResult = (from u in tbUsers
                                             join mr in tbMenuRole on u.IdRole equals mr.IdRole
                                             join m in tbMenu on mr.IdMenu equals m.IdMenu
                                             select m).AsQueryable();

                var listMenu = tbResult.ToList();

                return _mapper.Map<List<MenuDTO>>(listMenu);
            }
            catch
            {
                throw;
            }
        }
    }
}
