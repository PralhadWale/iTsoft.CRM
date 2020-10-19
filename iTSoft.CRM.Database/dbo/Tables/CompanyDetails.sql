CREATE TABLE [dbo].[CompanyDetails] (
    [CompanyId]       BIGINT        IDENTITY (1, 1) NOT NULL,
    [CompanyUrl]      VARCHAR (100) NOT NULL,
    [Name]            VARCHAR (100) NOT NULL,
    [Address]         VARCHAR (100) NULL,
    [CompanyPan]      VARCHAR (10)  NULL,
    [CompanyTan]      VARCHAR (10)  NOT NULL,
    [Officialwebsite] VARCHAR (100) NOT NULL,
    [LogoUrl]         VARCHAR (100) NULL,
    [LogoMimeType]    VARCHAR (50)  NULL,
    [IsActive]        BIT           NULL,
    [CreatedBy]       BIGINT        NULL,
    [CreatedDate]     DATETIME      NULL,
    [UpdatedBy]       BIGINT        NULL,
    [UpdatedDate]     DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([CompanyId] ASC)
);





