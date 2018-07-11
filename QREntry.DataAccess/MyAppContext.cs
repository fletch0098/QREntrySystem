using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using QREntry.Library;

namespace QREntry.DataAccess
{
    public class MyAppContext : DbContext
    {
        public MyAppContext(DbContextOptions opts)
        : base(opts)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Computer>().ToTable("Computer");
            //modelBuilder.Entity<Memory>().ToTable("Memory");
            base.OnModelCreating(modelBuilder);
        }

    }
}
