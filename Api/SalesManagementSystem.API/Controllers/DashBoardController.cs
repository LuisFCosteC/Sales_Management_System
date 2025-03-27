using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.API.Utility;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService _dashBoardService;

        public DashBoardController(IDashBoardService dashBoardService)
        {
            _dashBoardService = dashBoardService;
        }

        [HttpGet]
        [Route("Summary")]
        public async Task<IActionResult> Summary()
        {
            var rsp = new Response<DashBoardDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _dashBoardService.Summary();
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
