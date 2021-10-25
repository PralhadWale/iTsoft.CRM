CREATE TABLE [dbo].[UserRoleMapping] (
    [UserRoleMappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [Userfinancialid]   BIGINT   NULL,
    [RoleId]            BIGINT   NULL,
    [IsActive]          BIT      NULL,
    [CreatedBy]         BIGINT   NULL,
    [CreatedDate]       DATETIME NULL,
    [UpdatedBy]         BIGINT   NULL,
    [UpdatedDate]       DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserRoleMappingId] ASC),
    FOREIGN KEY ([RoleId]) REFERENCES [dbo].[RolesDetails] ([RoleId]),
    FOREIGN KEY ([Userfinancialid]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



