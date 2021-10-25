CREATE TABLE [dbo].[HP] (
    [HpId]                  BIGINT          IDENTITY (1, 1) NOT NULL,
    [LenderName]            VARCHAR (100)   NULL,
    [LenderAddress]         VARCHAR (500)   NULL,
    [LenderPAN]             VARCHAR (10)    NULL,
    [IsLetOut]              BIT             NULL,
    [IntrestPaidOnProperty] DECIMAL (18, 2) NULL,
    [MuncipalTaxes]         DECIMAL (18, 2) NULL,
    [IsActive]              BIT             NULL,
    [CreatedBy]             BIGINT          NULL,
    [CreatedDate]           DATETIME        NULL,
    [UpdatedBy]             BIGINT          NULL,
    [UpdatedDate]           DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([HpId] ASC)
);



