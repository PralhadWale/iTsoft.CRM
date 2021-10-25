CREATE TABLE [dbo].[StateDetails] (
    [StateId]     BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [CountryId]   BIGINT        NULL,
    [IsActive]    BIT           NULL,
    [CreatedBy]   BIGINT        NULL,
    [CreatedDate] DATETIME      NULL,
    [UpdatedBy]   BIGINT        NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([StateId] ASC),
    FOREIGN KEY ([CountryId]) REFERENCES [dbo].[CountryDetails] ([CountryId])
);



