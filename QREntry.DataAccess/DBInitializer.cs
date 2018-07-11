using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using QREntry.Library.Common;
using Microsoft.Extensions.Logging;

namespace QREntry.DataAccess
{
    public class DbInitializer
    {
        private readonly ILogger<DbInitializer> _logger;

        public DbInitializer(ILogger<DbInitializer> logger)
        {
            _logger = logger;
        }

        public void Initialize(MyAppContext context)
        {
            context.Database.EnsureCreated();

            //// Look for any students.
            //if (context.Computers.Any())
            //{
            //    _logger.LogInformation("Database already Seeded");
            //    return;   // DB has been seeded
            //}

            _logger.LogInformation("Preparing to Seed  database");

            //var Memories = new Memory[]
            //{
            //new Memory{  Brand = "Crucial", SizeGb = 8, Speed = "DDR3-1600" , LastModified=DateTime.Now},
            //new Memory{  Brand = "Crucial", SizeGb = 16, Speed = "DDR3-1600" , LastModified=DateTime.Now},
            //new Memory{  Brand = "Kingston", SizeGb = 8, Speed = "DDR3-800" , LastModified=DateTime.Now},
            //new Memory{  Brand = "Kingston", SizeGb = 16, Speed = "DDR3-800" , LastModified=DateTime.Now}
            //};

            //foreach (Memory m in Memories)
            //{
            //    context.Memories.Add(m);
            //}

            //var computers = new Computer[]
            //{
            //new Computer{ ConfiguracionName = "The Basic", HardDrive = "512GB HDD", Memory = Memories[0], Processor = "AMD", LastModified=DateTime.Now},
            //new Computer{ ConfiguracionName = "The Internet", HardDrive = "128GB SDD", Memory = Memories[1], Processor = "Intel i3", LastModified=DateTime.Now},
            //new Computer{ ConfiguracionName = "The Gamer", HardDrive = "1TB HDD", Memory = Memories[2], Processor = "Intel i5", LastModified=DateTime.Now},
            //new Computer{ ConfiguracionName = "The Beast", HardDrive = "512GB SDD", Memory = Memories[3], Processor = "Intel i7", LastModified=DateTime.Now}
            //};
            //foreach (Computer c in computers)
            //{
            //    context.Computers.Add(c);
            //}

            try
            {
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError("Database Seeding Error", ex);
            }

            //_logger.LogInformation(string.Format("{0} : Seeded Database with {1} Memories", System.Reflection.MethodBase.GetCurrentMethod(), Memories.Count()));
            //_logger.LogInformation(string.Format("{0} : Seeded Database with {1} Computers", System.Reflection.MethodBase.GetCurrentMethod(), computers.Count()));
            _logger.LogInformation(string.Format("{0} : DataBase Initializing Complete", System.Reflection.MethodBase.GetCurrentMethod()));
        }
    }
}

