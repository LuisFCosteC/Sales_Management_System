using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SalesManagementSystem.DAL.Repositories.Contract
{
    public interface IGenericRepository<TModel> where TModel : class
    {
        // 1st method -- Get
        Task<TModel> Get(Expression<Func<TModel, bool>> filter);

        // 2nd method -- Create
        Task<TModel> Create(TModel model);

        // 3rd method -- Edit
        Task<bool> Edit(TModel model);

        // 4th method -- Delete
        Task<bool> Delete(TModel model);

        // 5th method -- Consult
        Task<IQueryable<TModel>> Consult(Expression<Func<TModel, bool>> filter = null);
    }
}
