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

        [HttpGet("[action]/{_orderby}/{_ascend}")]
        public IEnumerable<Todo> TodoGet(int _orderby, bool _ascend)
        {
            var _return = new ApplicationDBContext(_context);
            switch (_orderby)
            {
                case 1:
                    if (_ascend) { return _return.Todos.OrderBy(x => x.Priority).ThenBy(x => x.Text).ThenBy(x => x.Date).ThenBy(x => x.Active).AsEnumerable(); }
                    else { return _return.Todos.OrderByDescending(x => x.Priority).ThenBy(x => x.Text).ThenBy(x => x.Date).ThenBy(x => x.Active).AsEnumerable(); }
                case 2:
                    if (_ascend) { return _return.Todos.OrderBy(x => x.Date).ThenBy(x => x.Priority).ThenBy(x => x.Text).ThenBy(x => x.Active).AsEnumerable(); }
                    else { return _return.Todos.OrderByDescending(x => x.Date).ThenBy(x => x.Priority).ThenBy(x => x.Text).ThenBy(x => x.Active).AsEnumerable(); }
                default:
                    if (_ascend)
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Priority, x.Text, x.Date
                                select x).AsEnumerable();
                    }
                    else
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Priority, x.Text ascending, x.Date
                                select x).AsEnumerable();
                    }
            }
        }

        [HttpPost("[action]")]
        public void TodoAdd([FromBody] Todo _todo)
        {
            var _return = new ApplicationDBContext(_context);
            _todo.Active = false;
            _todo.Date = DateTime.Now;
            _return.Todos.Add(_todo);
            _return.SaveChanges();
        }

        [HttpPost("[action]/{_Id}/{_active}")]
        public void TodoActive(int _Id, bool _active)
        {
            var _return = new ApplicationDBContext(_context);
            var _todos = _return.Todos.FirstOrDefault(x => x.Id == _Id);
            _todos.Active = !_active;
            _return.Todos.Update(_todos);
            _return.SaveChanges();
        }
    }
}