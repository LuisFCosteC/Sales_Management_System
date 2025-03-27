using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.API.Utility;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            var rsp = new Response<List<CategoryDTO>>();

            try
            {
                rsp.status = true;
                rsp.value = await _categoryService.List();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }
    }
}
