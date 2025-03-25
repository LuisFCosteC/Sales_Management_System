using System;
using System.Collections.Generic;
using System.Linq;
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
    public class CategoryService : ICategoryService
    {
        private readonly IGenericRepository<Category> _categoryRespository;
        private readonly IMapper _mapper;

        public CategoryService(IGenericRepository<Category> categoryRespository, IMapper mapper)
        {
            _categoryRespository = categoryRespository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDTO>> List()
        {
            try
            {
                var listCategories = await _categoryRespository.Consult();
                return _mapper.Map<List<CategoryDTO>>(listCategories.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
