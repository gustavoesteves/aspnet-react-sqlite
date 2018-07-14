using System;

namespace aspnet_react_sqlite.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int Priority { get; set; }
        public Boolean Active { get; set; }
    }
}