using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoWiederholung.Models
{
    [Table("ToDo")]
    public class ToDos : Entity
    {
        
        [Column("Titel")]
        public string Title { get; set; }

        [Column("Text")]
        public string Notes { get; set; }
    }
}
