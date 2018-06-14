using Microsoft.EntityFrameworkCore;
using aspnet_react_sqlite.Models;

namespace aspnet_react_sqlite.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }
    }
}