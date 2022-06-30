using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VueJSClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var name = User.FindFirst("name")?.Value ?? User.FindFirst("sub")?.Value;
            return new JsonResult(new { message = "Local API Success!", user = name });
        }
    }
}
