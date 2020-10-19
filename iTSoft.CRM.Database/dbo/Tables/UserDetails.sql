CREATE TABLE [dbo].[UserDetails] (
    [UserId]      BIGINT        IDENTITY (1, 1) NOT NULL,
    [FName]       VARCHAR (50)  NULL,
    [MName]       VARCHAR (50)  NULL,
    [LName]       VARCHAR (50)  NULL,
    [EmailId]     VARCHAR (100) NULL,
    [MobileNo]    VARCHAR (20)  NULL,
    [UserPan]     VARCHAR (10)  NULL,
    [DateOfBirth] DATETIME      NULL,
    [Gender]      VARCHAR (5)   NULL,
    [IsActive]    BIT           NULL,
    [CreatedBy]   BIGINT        NULL,
    [CreatedDate] DATETIME      NULL,
    [UpdatedBy]   BIGINT        NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([UserId] ASC)
);



