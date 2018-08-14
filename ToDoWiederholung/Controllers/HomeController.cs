using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDoWiederholung.Models;

namespace ToDoWiederholung.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
           using (ToDoContext db = new ToDoContext())
            {
                return View(db.ToDos.ToList());
                
            }
        }

        public List<ToDos> GetToDos() {
            using (ToDoContext db = new ToDoContext())
            {
                
                return db.ToDos.ToList();
            }
        }

        public IActionResult ListBack() {
            using (ToDoContext db = new ToDoContext())
            {
                return PartialView("_List", db.ToDos.ToList());
            }
        }
       

        [HttpPost]
        public IActionResult AddNew(string title, string notes) {
            using (ToDoContext db = new ToDoContext()) { 
                db.ToDos.Add(new ToDos() { Title = title, Notes = notes });
                db.SaveChanges();
                return RedirectToAction("ListBack");
            }
        }
        
        [HttpPost]
        public IActionResult EditNew(ToDos todo) {
            using (ToDoContext db = new ToDoContext()) {
                db.ToDos.Update(todo);
                db.SaveChanges();
                return RedirectToAction("ListBack");
            }
        }

        [HttpPost]
        public IActionResult DeleteItem(ToDos todo) {
            using (ToDoContext db = new ToDoContext()) {
                db.ToDos.Remove(todo);
                db.SaveChanges();
                return RedirectToAction("ListBack");
            }
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
