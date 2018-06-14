using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using aspnet_react_sqlite.Data;
using aspnet_react_sqlite.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet_react_sqlite.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly DbContextOptions<ApplicationDBContext> _context;

        public TodoController(DbContextOptions<ApplicationDBContext> context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Todo> TodoGet()
        {
            var _return = new ApplicationDBContext(_context);
            return _return.Todos.AsEnumerable();
        }
    }
}