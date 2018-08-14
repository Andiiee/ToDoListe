using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ToDoWiederholung.Models
{
    public class ToDoContext : DbContext
    {
        public DbSet<ToDos> ToDos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=ToDoListe;Trusted_Connection=True;");
        }
    }

}
