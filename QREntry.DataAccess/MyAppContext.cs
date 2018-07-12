using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using QREntry.Library.Model;

namespace QREntry.DataAccess
{
    public class MyAppContext : IdentityDbContext<AppUser>
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
            modelBuilder.Entity<Person>().ToTable("People");
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ControlledEntry> ControlledEntries { get; set; }
        public DbSet<Person> People { get; set; }

    }
}
