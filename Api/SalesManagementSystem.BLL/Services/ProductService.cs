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
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Product> _productRespository;
        private readonly IMapper _mapper;

        public ProductService(IGenericRepository<Product> productRespository, IMapper mapper)
        {
            _productRespository = productRespository;
            _mapper = mapper;
        }

        public async Task<List<ProductDTO>> List()
        {
            try
            {
                var queryProduct = await _productRespository.Consult();
                var listProduct = queryProduct.Include(cat => cat.IdCategoryNavigation).ToArray();
                return _mapper.Map<List<ProductDTO>>(listProduct.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductDTO> Create(ProductDTO model)
        {
            try
            {
                var createdProduct  = await _productRespository.Create(_mapper.Map<Product>(model));
                
                if (createdProduct.IdProduct == 0)
                    throw new TaskCanceledException("Product could not be created // No se pudo crear el producto");

                return _mapper.Map<ProductDTO>(createdProduct);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Edit(ProductDTO model)
        {
            try
            {
                var productModel = _mapper.Map<Product>(model);
                var productFound = await _productRespository.Get(u =>
                    u.IdProduct == productModel.IdProduct
                );

                if(productFound == null)
                    throw new TaskCanceledException("The product does not exist // EL producto no existe");

                productFound.Name = productModel.Name;
                productFound.IdCategory = productModel.IdCategory;
                productFound.Stock = productModel.Stock;
                productFound.Price = productModel.Price;
                productFound.IsActive = productModel.IsActive;

                bool reply = await _productRespository.Edit(productFound);

                if(!reply)
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
                var productFound = await _productRespository.Get(p => p.IdProduct == id);

                if(productFound == null)
                    throw new TaskCanceledException("The product does not exist // EL producto no existe");

                bool reply = await _productRespository.Delete(productFound);

                if (!reply)
                    throw new TaskCanceledException("Could not be eliminated // No se pudo eliminar");

                return reply;
            }
            catch
            {
                throw;
            }
        }
    }
}
