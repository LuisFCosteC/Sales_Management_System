using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SalesManagementSystem.BLL.Services.Contract;
using SalesManagementSystem.API.Utility;
using SalesManagementSystem.DTO;

namespace SalesManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] SalesDTO sales)
        {
            var rsp = new Response<SalesDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _salesService.Register(sales);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }

        [HttpGet]
        [Route("History")]
        public async Task<IActionResult> History(string searchBy, string? salesNumber, string? startDate, string? endDate)
        {
            var rsp = new Response<List<SalesDTO>>();
            salesNumber = salesNumber is null ? "": salesNumber;
            startDate = startDate is null ? "": startDate;
            endDate = endDate is null ? "": endDate;

            try
            {
                rsp.status = true;
                rsp.value = await _salesService.History(searchBy, salesNumber, startDate, endDate);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }

            return Ok(rsp);
        }

        [HttpGet]
        [Route("Report")]
        public async Task<IActionResult> Report(string? startDate, string? endDate)
        {
            var rsp = new Response<List<ReportDTO>>();

            try
            {
                rsp.status = true;
                rsp.value = await _salesService.Report(startDate, endDate);
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
