CREATE TABLE [dbo].[AccessDetails] (
    [AccessId]    BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [IsActive]    BIT           NULL,
    [CreatedBy]   BIGINT        NULL,
    [CreatedDate] DATETIME      NULL,
    [UpdatedBy]   BIGINT        NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([AccessId] ASC)
);



