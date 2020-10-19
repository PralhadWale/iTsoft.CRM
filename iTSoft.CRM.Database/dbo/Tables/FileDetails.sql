CREATE TABLE [dbo].[FileDetails] (
    [FileId]      BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [MimeType]    VARCHAR (50)  NULL,
    [IsActive]    BIT           NULL,
    [CreatedBy]   BIGINT        NULL,
    [CreatedDate] DATETIME      NULL,
    [UpdatedBy]   BIGINT        NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([FileId] ASC)
);



