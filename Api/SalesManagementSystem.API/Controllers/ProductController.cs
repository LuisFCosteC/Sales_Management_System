using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.API.Utility;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            var rsp = new Response<List<ProductDTO>>();

            try
            {
                rsp.status = true;
                rsp.value = await _productService.List();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }

        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] ProductDTO product)
        {
            var rsp = new Response<ProductDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _productService.Create(product);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }


        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] ProductDTO product)
        {
            var rsp = new Response<bool>();

            try
            {
                rsp.status = true;
                rsp.value = await _productService.Edit(product);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var rsp = new Response<bool>();

            try
            {
                rsp.status = true;
                rsp.value = await _productService.Delete(id);
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
