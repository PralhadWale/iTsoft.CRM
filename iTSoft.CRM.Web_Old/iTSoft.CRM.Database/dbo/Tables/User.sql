CREATE TABLE [dbo].[User] (
    [ID]           BIGINT        NOT NULL,
    [UserName]     NVARCHAR (50) NULL,
    [Password]     NVARCHAR (50) NULL,
    [RoleID]       INT           NULL,
    [LoginAttempt] INT           NULL,
    [IsActive]     BIT           NULL,
    [CreatedBy]    BIGINT        NULL,
    [CreatedDate]  DATETIME      NULL,
    [UpdatedBy]    BIGINT        NULL,
    [UpdatedDate]  DATETIME      NULL
);



