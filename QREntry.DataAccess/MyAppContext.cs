using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using QREntry.Library.Model;

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
            modelBuilder.Entity<ControlledEntry>().ToTable("ControlledEntries");
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ControlledEntry> ControlledEntries { get; set; }

    }
}
