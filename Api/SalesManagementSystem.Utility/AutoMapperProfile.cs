using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SalesManagementSystem.DTO;
using SalesManagementSystem.Model;

namespace SalesManagementSystem.Utility
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
        // --------------------------------------------------------------------------
        // ------------------------------ Role Mapping ------------------------------
        // --------------------------------------------------------------------------
            #region Role
            CreateMap<Role, RoleDTO>().ReverseMap();
            #endregion Role

        // --------------------------------------------------------------------------
        // ------------------------------ Menu Mapping ------------------------------
        // --------------------------------------------------------------------------
            #region Menu
            CreateMap<Menu, MenuDTO>().ReverseMap();
            #endregion Menu

        // ---------------------------------------------------------------------------
        // ------------------------------ Users Mapping ------------------------------
        // ---------------------------------------------------------------------------
            #region Users
            CreateMap<Users, UsersDTO>()
                .ForMember(destination =>
                    destination.RoleDescription,
                    opt => opt.MapFrom(origin => origin.IdRoleNavigation.Name)
                )
                .ForMember(destination =>
                    destination.IsActive,
                    opt => opt.MapFrom(origin => origin.IsActive == true ? 1 : 0)
                );

            CreateMap<Users, SessionDTO>()
                .ForMember(destination =>
                    destination.RoleDescription,
                    opt => opt.MapFrom(origin => origin.IdRoleNavigation.Name)
                );

            CreateMap<UsersDTO, Users>()
                .ForMember(destination =>
                    destination.IdRoleNavigation,
                    opt => opt.Ignore()
                )
                .ForMember(destination =>
                    destination.IsActive,
                    opt => opt.MapFrom(origin => origin.IsActive == 1 ? true : false)
                );
            #endregion Users

        // ------------------------------------------------------------------------------
        // ------------------------------ Category Mapping ------------------------------
        // ------------------------------------------------------------------------------
            #region Category
            CreateMap<Category, CategoryDTO>().ReverseMap();
            #endregion Category

        // -----------------------------------------------------------------------------
        // ------------------------------ Product Mapping ------------------------------
        // -----------------------------------------------------------------------------
            #region Product
            CreateMap<Product, ProductDTO>()
                .ForMember(destination =>
                    destination.CategoryDescription,
                    opt => opt.MapFrom(origin => origin.IdCategoryNavigation.Name)
                )
                .ForMember(destination =>
                    destination.Price,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Price.Value, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.IsActive,
                    opt => opt.MapFrom(origin => origin.IsActive == true ? 1 : 0)
                );

            CreateMap<ProductDTO, Product>()
                .ForMember(destination =>
                    destination.IdCategoryNavigation,
                    opt => opt.Ignore()
                )
                .ForMember(destination =>
                    destination.Price,
                    opt => opt.MapFrom(origin => Convert.ToDecimal(origin.Price, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.IsActive,
                    opt => opt.MapFrom(origin => origin.IsActive == 1 ? true : false)
                );
            #endregion Product

        // ---------------------------------------------------------------------------
        // ------------------------------ Sales Mapping ------------------------------
        // ---------------------------------------------------------------------------
            #region Sales
            CreateMap<Sales, SalesDTO>()
                .ForMember(destination =>
                    destination.TotalText,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Total.Value, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.DateRegistration,
                    opt => opt.MapFrom(origin => origin.DateRegistration.Value.ToString("dd/MM/yyyy"))
                );

            CreateMap<SalesDTO, Sales>()
                .ForMember(destination =>
                    destination.Total,
                    opt => opt.MapFrom(origin => Convert.ToDecimal(origin.TotalText, new CultureInfo("es-COL")))
                );
            #endregion Sales

        // ---------------------------------------------------------------------------------
        // ------------------------------ DetailSales Mapping ------------------------------
        // ---------------------------------------------------------------------------------
            #region DetailSales
            CreateMap<DetailSales, DetailSalesDTO>()
                .ForMember(destination =>
                    destination.ProductDescription,
                    opt => opt.MapFrom(origin => origin.IdProductNavigation.Name)
                )
                .ForMember(destination =>
                    destination.PriceText,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Price.Value, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.TotalText,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Total.Value, new CultureInfo("es-COL")))
                );

            CreateMap<DetailSalesDTO, DetailSales>()
                .ForMember(destination =>
                    destination.Price,
                    opt => opt.MapFrom(origin => Convert.ToDecimal(origin.PriceText, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.Total,
                    opt => opt.MapFrom(origin => Convert.ToDecimal(origin.TotalText, new CultureInfo("es-COL")))
                );
            #endregion DetailSales

        // ----------------------------------------------------------------------------
        // ------------------------------ Report Mapping ------------------------------
        // ----------------------------------------------------------------------------
            #region Report
            CreateMap<DetailSales, ReportDTO>()
                .ForMember(destination =>
                    destination.DateRegistration,
                    opt => opt.MapFrom(origin => origin.IdSalesNavigation.DateRegistration.Value.ToString("dd/MM/yyyy"))
                )
                .ForMember(destination =>
                    destination.SalesNumber,
                    opt => opt.MapFrom(origin => origin.IdSalesNavigation.SalesNumber)
                )
                .ForMember(destination =>
                    destination.PaymentType,
                    opt => opt.MapFrom(origin => origin.IdSalesNavigation.PaymentType)
                )
                .ForMember(destination =>
                    destination.TotalSales,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.IdSalesNavigation.Total.Value, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.Product,
                    opt => opt.MapFrom(origin => origin.IdProductNavigation.Name)
                )
                .ForMember(destination =>
                    destination.Price,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Price.Value, new CultureInfo("es-COL")))
                )
                .ForMember(destination =>
                    destination.Total,
                    opt => opt.MapFrom(origin => Convert.ToString(origin.Total.Value, new CultureInfo("es-COL")))
                );
            #endregion Report
        }
    }
}
