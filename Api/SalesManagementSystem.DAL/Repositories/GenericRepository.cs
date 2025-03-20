using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesManagementSystem.DAL.DBContext;
using SalesManagementSystem.DAL.Repositories.Contract;

namespace SalesManagementSystem.DAL.Repositories
{
    public class GenericRepository<TModel> : IGenericRepository<TModel> where TModel : class
    {
        private readonly DbSalesContext _dbcontext;

        public GenericRepository(DbSalesContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        
        public async Task<TModel> Get(Expression<Func<TModel, bool>> filter)
        {
            try
            {
                TModel model = await _dbcontext.Set<TModel>().FirstOrDefaultAsync(filter);
                return model;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TModel> Create(TModel model)
        {
            try
            {
                _dbcontext.Set<TModel>().Add(model);
                await _dbcontext.SaveChangesAsync();
                return model;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Edit(TModel model)
        {
            try
            {
                _dbcontext.Set<TModel>().Update(model);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Delete(TModel model)
        {
            try
            {
                _dbcontext.Set<TModel>().Remove(model);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IQueryable<TModel>> Consult(Expression<Func<TModel, bool>> filter = null)
        {
            try
            {
                IQueryable<TModel> queryModel = filter == null ? _dbcontext.Set<TModel>() : _dbcontext.Set<TModel>().Where(filter);
                return queryModel;
            }
            catch
            {
                throw;
            }
        }
    }
}
