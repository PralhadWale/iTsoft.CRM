CREATE TABLE [dbo].[CityDetail] (
    [CityId]      BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [StateId]     BIGINT        NULL,
    [IsActive]    BIT           NULL,
    [CreatedBy]   BIGINT        NULL,
    [CreatedDate] DATETIME      NULL,
    [UpdatedBy]   BIGINT        NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([CityId] ASC),
    FOREIGN KEY ([StateId]) REFERENCES [dbo].[StateDetails] ([StateId])
);



