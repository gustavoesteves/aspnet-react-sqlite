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
                    if (_ascend)
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Priority
                                select x).AsEnumerable();
                    }
                    else
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Priority ascending
                                select x).AsEnumerable();
                    }
                case 2:
                    if (_ascend)
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Date
                                select x).AsEnumerable();
                    }
                    else
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Date ascending
                                select x).AsEnumerable();
                    }
                default:
                    if (_ascend)
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Text
                                select x).AsEnumerable();
                    }
                    else
                    {
                        return (from x in _return.Todos
                                orderby x.Active, x.Text ascending
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

        [HttpPost("[action]/{_Id}")]
        public void TodoActive(int _Id)
        {
            var _return = new ApplicationDBContext(_context);
            var _todos = _return.Todos.FirstOrDefault(x => x.Id == _Id);
            _todos.Active = !_todos.Active;
            _return.Todos.Update(_todos);
            _return.SaveChanges();
        }

        [HttpPost("[action]/{_Id}/{_Text}")]
        public void TodoEditText(int _Id, string _Text)
        {
            var _return = new ApplicationDBContext(_context);
            var _todos = _return.Todos.FirstOrDefault(x => x.Id == _Id);
            _todos.Text = _Text;
            _return.Todos.Update(_todos);
            _return.SaveChanges();
        }
    }
}