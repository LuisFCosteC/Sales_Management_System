using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.DAL.Repositories.Contract;
using SalesManagementSystem.DTO;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.BLL.Services
{
    public class UsersService : IUsersService
    {
        private readonly IGenericRepository<Users> _usersRespository;
        private readonly IMapper _mapper;

        public UsersService(IGenericRepository<Users> usersRespository, IMapper mapper)
        {
            _usersRespository = usersRespository;
            _mapper = mapper;
        }

        public async Task<List<UsersDTO>> List()
        {
            try
            {
                var queryUsers = await _usersRespository.Consult();
                var listUsers = queryUsers.Include(Role => Role.IdRoleNavigation).ToList();
                return _mapper.Map<List<UsersDTO>>(listUsers);
            }
            catch
            {
                throw;
            }
        }

        public async Task<SessionDTO> ValidateCredentials(string email, string password)
        {
            try
            {
                var queryUsers = await _usersRespository.Consult(u => 
                    u.Email == email && 
                    u.Password == password
                );

                if (queryUsers.FirstOrDefault() == null)
                    throw new TaskCanceledException("The user does not exist // El usuario no existe)");

                Users returnUsers = queryUsers.Include(Role => Role.IdRoleNavigation).First();

                return _mapper.Map<SessionDTO>(returnUsers);
            }
            catch
            {
                throw;
            }
        }

        public async Task<UsersDTO> Create(UsersDTO model)
        {
            try
            {
                var usersCreated = await _usersRespository.Create(_mapper.Map<Users>(model));

                if (usersCreated.IdUsers == 0)
                    throw new TaskCanceledException("User could not be created // No se pudo crear el usuario");

                var query = await _usersRespository.Consult(u => u.IdUsers == usersCreated.IdUsers);
                usersCreated = query.Include(Role => Role.IdRoleNavigation).First();

                return _mapper.Map<UsersDTO>(usersCreated);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Edit(UsersDTO model)
        {
            try
            {
                var usersModel = _mapper.Map<Users>(model);
                var usersFound = await _usersRespository.Get(u => u.IdUsers == usersModel.IdUsers);

                if (usersFound == null)
                    throw new TaskCanceledException("The user does not exist // El usuario no existe");

                usersFound.FullName = usersModel.FullName;
                usersFound.Email = usersModel.Email;
                usersFound.IdRole = usersModel.IdRole;
                usersFound.Password = usersModel.Password;
                usersFound.IsActive = usersModel.IsActive;

                bool reply = await _usersRespository.Edit(usersFound);

                if (!reply)
                    throw new TaskCanceledException("Unable to edit // No se pudo editar");

                return reply;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var usersFound = await _usersRespository.Get(u => u.IdUsers == id);

                if (usersFound == null)
                    throw new TaskCanceledException("The user does not exist // El usuario no existe");

                bool reply = await _usersRespository.Delete(usersFound);

                if (!reply)
                    throw new TaskCanceledException("Unable to delete // No se pudo eliminar");

                return reply;
            }
            catch
            {
                throw;
            }
        }
    }
}
