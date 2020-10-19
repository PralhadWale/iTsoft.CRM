CREATE TABLE [dbo].[InvestmentCategorySubcategoryMapping] (
    [InvestmentCategorySubcategoryMappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentCategoryId]                   BIGINT   NULL,
    [InvestmentSubCategoryId]                BIGINT   NULL,
    [IsActive]                               BIT      NULL,
    [CreatedBy]                              BIGINT   NULL,
    [CreatedDate]                            DATETIME NULL,
    [UpdatedBy]                              BIGINT   NULL,
    [UpdatedDate]                            DATETIME NULL,
    PRIMARY KEY CLUSTERED ([InvestmentCategorySubcategoryMappingId] ASC),
    FOREIGN KEY ([InvestmentCategoryId]) REFERENCES [dbo].[InvestmentCategory] ([InvestmentCategory]),
    FOREIGN KEY ([InvestmentSubCategoryId]) REFERENCES [dbo].[InvestmentSubCategory] ([InvestmentSubCategoryId])
);



