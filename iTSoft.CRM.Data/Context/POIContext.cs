using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iTSoft.CRM.Data.Context
{
    public partial class CRMContext : DbContext
    {
        public CRMContext()
        {
        }

        public CRMContext(DbContextOptions<CRMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AccessDetails> AccessDetails { get; set; }
        public virtual DbSet<AddressDetails> AddressDetails { get; set; }
        public virtual DbSet<AddressUserMapping> AddressUserMapping { get; set; }
        public virtual DbSet<CityDetail> CityDetail { get; set; }
        public virtual DbSet<CompanyDetails> CompanyDetails { get; set; }
        public virtual DbSet<CompanyFinancialMapping> CompanyFinancialMapping { get; set; }
        public virtual DbSet<CountryDetails> CountryDetails { get; set; }
        public virtual DbSet<DepartmentDetails> DepartmentDetails { get; set; }
        public virtual DbSet<FileDetails> FileDetails { get; set; }
        public virtual DbSet<FinancialDetails> FinancialDetails { get; set; }
        public virtual DbSet<FinancialYearDetails> FinancialYearDetails { get; set; }
        public virtual DbSet<Hp> Hp { get; set; }
        public virtual DbSet<Hra> Hra { get; set; }
        public virtual DbSet<InvestmentCategory> InvestmentCategory { get; set; }
        public virtual DbSet<InvestmentCategorySubcategoryMapping> InvestmentCategorySubcategoryMapping { get; set; }
        public virtual DbSet<InvestmentCycleDetails> InvestmentCycleDetails { get; set; }
        public virtual DbSet<InvestmentFileUserMapping> InvestmentFileUserMapping { get; set; }
        public virtual DbSet<InvestmentSubCategory> InvestmentSubCategory { get; set; }
        public virtual DbSet<InvestmentSubmissionDetails> InvestmentSubmissionDetails { get; set; }
        public virtual DbSet<LoginDetail> LoginDetail { get; set; }
        public virtual DbSet<Lta> Lta { get; set; }
        public virtual DbSet<PreviousEmployeementDetails> PreviousEmployeementDetails { get; set; }
        public virtual DbSet<RolesDetails> RolesDetails { get; set; }
        public virtual DbSet<StateDetails> StateDetails { get; set; }
        public virtual DbSet<TypeOfInvestmentCycle> TypeOfInvestmentCycle { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserAccessMapping> UserAccessMapping { get; set; }
        public virtual DbSet<UserDetails> UserDetails { get; set; }
        public virtual DbSet<UserFinancialDetailMapping> UserFinancialDetailMapping { get; set; }
        public virtual DbSet<UserFinancialInvestmentCycleMapping> UserFinancialInvestmentCycleMapping { get; set; }
        public virtual DbSet<UserFinancialYearWiseDetails> UserFinancialYearWiseDetails { get; set; }
        public virtual DbSet<UserHpmapping> UserHpmapping { get; set; }
        public virtual DbSet<UserHramapping> UserHramapping { get; set; }
        public virtual DbSet<UserInvestmentCycleMapping> UserInvestmentCycleMapping { get; set; }
        public virtual DbSet<UserLoginMapping> UserLoginMapping { get; set; }
        public virtual DbSet<UserLtamapping> UserLtamapping { get; set; }
        public virtual DbSet<UserPreviousEmployeementMapping> UserPreviousEmployeementMapping { get; set; }
        public virtual DbSet<UserRoleMapping> UserRoleMapping { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseSqlServer("Server=DESKTOP-U01PMGD\\SQLEXPRESS;Initial Catalog=CRM;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccessDetails>(entity =>
            {
                entity.HasKey(e => e.AccessId)
                    .HasName("PK__AccessDe__4130D05F6812F263");

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<AddressDetails>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.Pincode).IsUnicode(false);
            });

            modelBuilder.Entity<AddressUserMapping>(entity =>
            {
                entity.HasOne(d => d.AddressDetails)
                    .WithMany(p => p.AddressUserMapping)
                    .HasForeignKey(d => d.AddressDetailsId)
                    .HasConstraintName("FK__AddressUs__Addre__05D8E0BE");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.AddressUserMapping)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK__AddressUs__CityI__07C12930");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.AddressUserMapping)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK__AddressUs__Count__09A971A2");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.AddressUserMapping)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK__AddressUs__State__08B54D69");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.AddressUserMapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__AddressUs__UserF__06CD04F7");
            });

            modelBuilder.Entity<CityDetail>(entity =>
            {
                entity.HasKey(e => e.CityId)
                    .HasName("PK__CityDeta__F2D21B76FEAEB60C");

                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.State)
                    .WithMany(p => p.CityDetail)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK__CityDetai__State__02FC7413");
            });

            modelBuilder.Entity<CompanyDetails>(entity =>
            {
                entity.HasKey(e => e.CompanyId)
                    .HasName("PK__CompanyD__2D9620D47F9074F9");

                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.CompanyPan).IsUnicode(false);

                entity.Property(e => e.CompanyTan).IsUnicode(false);

                entity.Property(e => e.CompanyUrl).IsUnicode(false);

                entity.Property(e => e.LogoMimeType).IsUnicode(false);

                entity.Property(e => e.LogoUrl).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Officialwebsite).IsUnicode(false);
            });

            modelBuilder.Entity<CompanyFinancialMapping>(entity =>
            {
                entity.HasKey(e => e.CompanyFinancialId)
                    .HasName("PK__CompanyF__E9BDBD83536E2BBD");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyFinancialMapping)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK__CompanyFi__Compa__412EB0B6");

                entity.HasOne(d => d.FinancialYear)
                    .WithMany(p => p.CompanyFinancialMapping)
                    .HasForeignKey(d => d.FinancialYearId)
                    .HasConstraintName("FK__CompanyFi__Finan__4222D4EF");
            });

            modelBuilder.Entity<CountryDetails>(entity =>
            {
                entity.HasKey(e => e.CountryId)
                    .HasName("PK__CountryD__10D1609F03DD2669");

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<DepartmentDetails>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PK__Departme__B2079BED0D074ED4");

                entity.Property(e => e.Code).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.DepartmentDetails)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK__Departmen__Compa__5DCAEF64");
            });

            modelBuilder.Entity<FileDetails>(entity =>
            {
                entity.HasKey(e => e.FileId)
                    .HasName("PK__FileDeta__6F0F98BFE0C05356");

                entity.Property(e => e.MimeType).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<FinancialYearDetails>(entity =>
            {
                entity.HasKey(e => e.FinancialYearId)
                    .HasName("PK__Financia__6ECE4C91CF01EBAB");

                entity.Property(e => e.DisplayYear).IsUnicode(false);

                entity.Property(e => e.FinancialYear).IsUnicode(false);
            });

            modelBuilder.Entity<Hp>(entity =>
            {
                entity.Property(e => e.LenderAddress).IsUnicode(false);

                entity.Property(e => e.LenderName).IsUnicode(false);

                entity.Property(e => e.LenderPan).IsUnicode(false);
            });

            modelBuilder.Entity<Hra>(entity =>
            {
                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.IsMetro).IsUnicode(false);

                entity.Property(e => e.LandlordAddress).IsUnicode(false);

                entity.Property(e => e.LandlordName).IsUnicode(false);

                entity.Property(e => e.LandlordPan).IsUnicode(false);
            });

            modelBuilder.Entity<InvestmentCategory>(entity =>
            {
                entity.HasKey(e => e.InvestmentCategory1)
                    .HasName("PK__Investme__9ED75400896BB271");

                entity.Property(e => e.Code).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<InvestmentCategorySubcategoryMapping>(entity =>
            {
                entity.HasOne(d => d.InvestmentCategory)
                    .WithMany(p => p.InvestmentCategorySubcategoryMapping)
                    .HasForeignKey(d => d.InvestmentCategoryId)
                    .HasConstraintName("FK__Investmen__Inves__1332DBDC");

                entity.HasOne(d => d.InvestmentSubCategory)
                    .WithMany(p => p.InvestmentCategorySubcategoryMapping)
                    .HasForeignKey(d => d.InvestmentSubCategoryId)
                    .HasConstraintName("FK__Investmen__Inves__14270015");
            });

            modelBuilder.Entity<InvestmentCycleDetails>(entity =>
            {
                entity.HasKey(e => e.InvestmentCycleId)
                    .HasName("PK__Investme__918EC22A87FC7442");

                entity.Property(e => e.Code).IsUnicode(false);

                entity.Property(e => e.DisplayName).IsUnicode(false);
            });

            modelBuilder.Entity<InvestmentFileUserMapping>(entity =>
            {
                entity.HasOne(d => d.File)
                    .WithMany(p => p.InvestmentFileUserMapping)
                    .HasForeignKey(d => d.FileId)
                    .HasConstraintName("FK__Investmen__FileI__1DB06A4F");

                entity.HasOne(d => d.InvestmentCycleType)
                    .WithMany(p => p.InvestmentFileUserMapping)
                    .HasForeignKey(d => d.InvestmentCycleTypeId)
                    .HasConstraintName("FK__Investmen__Inves__1F98B2C1");

                entity.HasOne(d => d.InvestmentSubmission)
                    .WithMany(p => p.InvestmentFileUserMapping)
                    .HasForeignKey(d => d.InvestmentSubmissionId)
                    .HasConstraintName("FK__Investmen__Inves__1EA48E88");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.InvestmentFileUserMapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__Investmen__UserF__1CBC4616");
            });

            modelBuilder.Entity<InvestmentSubCategory>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<InvestmentSubmissionDetails>(entity =>
            {
                entity.HasKey(e => e.InvestmentSubmissionId)
                    .HasName("PK__Investme__137127ED61211A7A");

                entity.Property(e => e.IsAccepted).IsUnicode(false);

                entity.Property(e => e.Reason).IsUnicode(false);

                entity.Property(e => e.UserComment).IsUnicode(false);
            });

            modelBuilder.Entity<LoginDetail>(entity =>
            {
                entity.HasKey(e => e.LoginId)
                    .HasName("PK__LoginDet__4DDA2818EB22B8B4");

                entity.Property(e => e.Password).IsUnicode(false);

                entity.Property(e => e.UserName).IsUnicode(false);
            });

            modelBuilder.Entity<Lta>(entity =>
            {
                entity.Property(e => e.JourneyEndPlace).IsUnicode(false);

                entity.Property(e => e.JourneyMode).IsUnicode(false);

                entity.Property(e => e.JourneyStartPlace).IsUnicode(false);
            });

            modelBuilder.Entity<PreviousEmployeementDetails>(entity =>
            {
                entity.HasKey(e => e.PreviousEmployeementId)
                    .HasName("PK__Previous__99F1B4AFE6C6D02B");

                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.EmployerName).IsUnicode(false);
            });

            modelBuilder.Entity<RolesDetails>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK__RolesDet__8AFACE1AF4D4D45D");

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<StateDetails>(entity =>
            {
                entity.HasKey(e => e.StateId)
                    .HasName("PK__StateDet__C3BA3B3A0CA46FAD");

                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.StateDetails)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK__StateDeta__Count__7A672E12");
            });

            modelBuilder.Entity<TypeOfInvestmentCycle>(entity =>
            {
                entity.HasKey(e => e.InvestmentCycleTypeId)
                    .HasName("PK__TypeOfIn__D0A30DA38175A955");

                entity.Property(e => e.Code).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<UserAccessMapping>(entity =>
            {
                entity.HasKey(e => e.AccessMatrixId)
                    .HasName("PK__UserAcce__EDEA353969A28BD4");

                entity.HasOne(d => d.Access)
                    .WithMany(p => p.UserAccessMapping)
                    .HasForeignKey(d => d.AccessId)
                    .HasConstraintName("FK__UserAcces__Acces__70DDC3D8");

                entity.HasOne(d => d.UserRoleMapping)
                    .WithMany(p => p.UserAccessMapping)
                    .HasForeignKey(d => d.UserRoleMappingId)
                    .HasConstraintName("FK__UserAcces__UserR__71D1E811");
            });

            modelBuilder.Entity<UserDetails>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserDeta__1788CC4C21019D08");

                entity.Property(e => e.EmailId).IsUnicode(false);

                entity.Property(e => e.Fname).IsUnicode(false);

                entity.Property(e => e.Gender).IsUnicode(false);

                entity.Property(e => e.Lname).IsUnicode(false);

                entity.Property(e => e.Mname).IsUnicode(false);

                entity.Property(e => e.MobileNo).IsUnicode(false);

                entity.Property(e => e.UserPan).IsUnicode(false);
            });

            modelBuilder.Entity<UserFinancialDetailMapping>(entity =>
            {
                entity.HasOne(d => d.FinancialDetails)
                    .WithMany(p => p.UserFinancialDetailMapping)
                    .HasForeignKey(d => d.FinancialDetailsId)
                    .HasConstraintName("FK__UserFinan__Finan__4C6B5938");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserFinancialDetailMapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserFinan__UserF__4D5F7D71");
            });

            modelBuilder.Entity<UserFinancialInvestmentCycleMapping>(entity =>
            {
                entity.HasKey(e => e.UserFinancialId)
                    .HasName("PK__UserFina__67C498A7DF2B9BF7");

                entity.HasOne(d => d.CompanyFinancial)
                    .WithMany(p => p.UserFinancialInvestmentCycleMapping)
                    .HasForeignKey(d => d.CompanyFinancialId)
                    .HasConstraintName("FK__UserFinan__Compa__59FA5E80");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserFinancialInvestmentCycleMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserFinan__UserI__59063A47");

                entity.HasOne(d => d.UserInvestmentMapping)
                    .WithMany(p => p.UserFinancialInvestmentCycleMapping)
                    .HasForeignKey(d => d.UserInvestmentMappingId)
                    .HasConstraintName("FK__UserFinan__UserI__5AEE82B9");
            });

            modelBuilder.Entity<UserFinancialYearWiseDetails>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.Designation).IsUnicode(false);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.UserFinancialYearWiseDetails)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK__UserFinan__Depar__619B8048");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserFinancialYearWiseDetails)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserFinan__UserF__60A75C0F");
            });

            modelBuilder.Entity<UserHpmapping>(entity =>
            {
                entity.HasOne(d => d.Hp)
                    .WithMany(p => p.UserHpmapping)
                    .HasForeignKey(d => d.HpId)
                    .HasConstraintName("FK__UserHPMapp__HpId__37703C52");

                entity.HasOne(d => d.InvestmentSubmission)
                    .WithMany(p => p.UserHpmapping)
                    .HasForeignKey(d => d.InvestmentSubmissionId)
                    .HasConstraintName("FK__UserHPMap__Inves__3587F3E0");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserHpmapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserHPMap__UserF__367C1819");
            });

            modelBuilder.Entity<UserHramapping>(entity =>
            {
                entity.HasOne(d => d.Hra)
                    .WithMany(p => p.UserHramapping)
                    .HasForeignKey(d => d.Hraid)
                    .HasConstraintName("FK__UserHRAMa__Hraid__2CF2ADDF");

                entity.HasOne(d => d.InvestmentSubmission)
                    .WithMany(p => p.UserHramapping)
                    .HasForeignKey(d => d.InvestmentSubmissionId)
                    .HasConstraintName("FK__UserHRAMa__Inves__2B0A656D");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserHramapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserHRAMa__UserF__2BFE89A6");
            });

            modelBuilder.Entity<UserInvestmentCycleMapping>(entity =>
            {
                entity.HasKey(e => e.UserInvestMentmappingId)
                    .HasName("PK__UserInve__ABA8AFC89EE8DDDF");

                entity.HasOne(d => d.CompanyFinancial)
                    .WithMany(p => p.UserInvestmentCycleMapping)
                    .HasForeignKey(d => d.CompanyFinancialId)
                    .HasConstraintName("FK__UserInves__Compa__47DBAE45");

                entity.HasOne(d => d.InvestmentCycle)
                    .WithMany(p => p.UserInvestmentCycleMapping)
                    .HasForeignKey(d => d.InvestmentCycleId)
                    .HasConstraintName("FK__UserInves__Inves__46E78A0C");

                entity.HasOne(d => d.InvestmentCycletype)
                    .WithMany(p => p.UserInvestmentCycleMapping)
                    .HasForeignKey(d => d.InvestmentCycletypeId)
                    .HasConstraintName("FK__UserInves__Inves__48CFD27E");
            });

            modelBuilder.Entity<UserLoginMapping>(entity =>
            {
                entity.HasOne(d => d.Login)
                    .WithMany(p => p.UserLoginMapping)
                    .HasForeignKey(d => d.LoginId)
                    .HasConstraintName("FK__UserLogin__Login__66603565");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLoginMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserLogin__UserI__656C112C");
            });

            modelBuilder.Entity<UserLtamapping>(entity =>
            {
                entity.HasOne(d => d.InvestmentSubmission)
                    .WithMany(p => p.UserLtamapping)
                    .HasForeignKey(d => d.InvestmentSubmissionId)
                    .HasConstraintName("FK__UserLTAMa__Inves__3A4CA8FD");

                entity.HasOne(d => d.Lta)
                    .WithMany(p => p.UserLtamapping)
                    .HasForeignKey(d => d.LtaId)
                    .HasConstraintName("FK__UserLTAMa__LtaId__3C34F16F");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserLtamapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserLTAMa__UserF__3B40CD36");
            });

            modelBuilder.Entity<UserPreviousEmployeementMapping>(entity =>
            {
                entity.HasKey(e => e.UserPreviousEmployeementId)
                    .HasName("PK__UserPrev__153A6C941E0D0F42");

                entity.HasOne(d => d.InvestmentSubmission)
                    .WithMany(p => p.UserPreviousEmployeementMapping)
                    .HasForeignKey(d => d.InvestmentSubmissionId)
                    .HasConstraintName("FK__UserPrevi__Inves__45BE5BA9");

                entity.HasOne(d => d.PreviousEmployeement)
                    .WithMany(p => p.UserPreviousEmployeementMapping)
                    .HasForeignKey(d => d.PreviousEmployeementId)
                    .HasConstraintName("FK__UserPrevi__Previ__47A6A41B");

                entity.HasOne(d => d.UserFinancial)
                    .WithMany(p => p.UserPreviousEmployeementMapping)
                    .HasForeignKey(d => d.UserFinancialId)
                    .HasConstraintName("FK__UserPrevi__UserF__46B27FE2");
            });

            modelBuilder.Entity<UserRoleMapping>(entity =>
            {
                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoleMapping)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__UserRoleM__RoleI__6C190EBB");

                entity.HasOne(d => d.Userfinancial)
                    .WithMany(p => p.UserRoleMapping)
                    .HasForeignKey(d => d.Userfinancialid)
                    .HasConstraintName("FK__UserRoleM__Userf__6B24EA82");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
