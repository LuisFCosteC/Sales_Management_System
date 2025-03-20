using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SalesManagementSystem.Model;

public partial class DbSalesContext : DbContext
{
    public DbSalesContext()
    {
    }

    public DbSalesContext(DbContextOptions<DbSalesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<DetailSales> DetailSales { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<MenuRole> MenuRoles { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Sales> Sales { get; set; }

    public virtual DbSet<SalesNumber> SalesNumbers { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS; DataBase=DB_Sales; Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.IdCategory).HasName("PK__Category__79D361B6BCDCEE79");

            entity.ToTable("Category");

            entity.Property(e => e.IdCategory).HasColumnName("idCategory");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("isActive");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<DetailSales>(entity =>
        {
            entity.HasKey(e => e.IdDetailSales).HasName("PK__DetailSa__0476BF70DD35937A");

            entity.Property(e => e.IdDetailSales).HasColumnName("idDetailSales");
            entity.Property(e => e.IdProduct).HasColumnName("idProduct");
            entity.Property(e => e.IdSales).HasColumnName("idSales");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("total");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.DetailSales)
                .HasForeignKey(d => d.IdProduct)
                .HasConstraintName("FK__DetailSal__idPro__05D8E0BE");

            entity.HasOne(d => d.IdSalesNavigation).WithMany(p => p.DetailSales)
                .HasForeignKey(d => d.IdSales)
                .HasConstraintName("FK__DetailSal__idSal__04E4BC85");
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.IdMenu).HasName("PK__Menu__C26AF483F85B2B9D");

            entity.ToTable("Menu");

            entity.Property(e => e.IdMenu).HasColumnName("idMenu");
            entity.Property(e => e.Icon)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("icon");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Url)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("url");
        });

        modelBuilder.Entity<MenuRole>(entity =>
        {
            entity.HasKey(e => e.IdMenuRole).HasName("PK__MenuRole__DD79D4CAB95D629A");

            entity.ToTable("MenuRole");

            entity.Property(e => e.IdMenuRole).HasColumnName("idMenuRole");
            entity.Property(e => e.IdMenu).HasColumnName("idMenu");
            entity.Property(e => e.IdRole).HasColumnName("idRole");

            entity.HasOne(d => d.IdMenuNavigation).WithMany(p => p.MenuRoles)
                .HasForeignKey(d => d.IdMenu)
                .HasConstraintName("FK__MenuRole__idMenu__6E01572D");

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.MenuRoles)
                .HasForeignKey(d => d.IdRole)
                .HasConstraintName("FK__MenuRole__idRole__6EF57B66");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.IdProduct).HasName("PK__Product__5EEC79D1CFB47CDC");

            entity.ToTable("Product");

            entity.Property(e => e.IdProduct).HasColumnName("idProduct");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.IdCategory).HasColumnName("idCategory");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("isActive");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.Stock).HasColumnName("stock");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.IdCategory)
                .HasConstraintName("FK__Product__idCateg__7A672E12");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRole).HasName("PK__Role__E5045C5466EFF4A9");

            entity.ToTable("Role");

            entity.Property(e => e.IdRole).HasColumnName("idRole");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Sales>(entity =>
        {
            entity.HasKey(e => e.IdSales).HasName("PK__Sales__F82016616C15239C");

            entity.Property(e => e.IdSales).HasColumnName("idSales");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.PaymentType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("paymentType");
            entity.Property(e => e.SalesNumber)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("salesNumber");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("total");
        });

        modelBuilder.Entity<SalesNumber>(entity =>
        {
            entity.HasKey(e => e.IdSalesNumber).HasName("PK__SalesNum__BB856C20789B7C31");

            entity.ToTable("SalesNumber");

            entity.Property(e => e.IdSalesNumber).HasColumnName("idSalesNumber");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.LastNumber).HasColumnName("last_Number");
        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(e => e.IdUsers).HasName("PK__Users__981CF2B18A33E9D9");

            entity.Property(e => e.IdUsers).HasColumnName("idUsers");
            entity.Property(e => e.DateRegistration)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dateRegistration");
            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("fullName");
            entity.Property(e => e.IdRole).HasColumnName("idRole");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("isActive");
            entity.Property(e => e.Password)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("password");

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.IdRole)
                .HasConstraintName("FK__Users__idRole__71D1E811");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
