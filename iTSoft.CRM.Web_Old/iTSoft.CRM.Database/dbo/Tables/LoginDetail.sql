CREATE TABLE [dbo].[LoginDetail] (
    [LoginId]        BIGINT        IDENTITY (1, 1) NOT NULL,
    [UserName]       VARCHAR (100) NULL,
    [Password]       VARCHAR (100) NULL,
    [LoginAttempt]   BIGINT        NULL,
    [Otp]            BIGINT        NULL,
    [OtpCreatedDate] DATETIME      NULL,
    [IsActive]       BIT           NULL,
    [CreatedBy]      BIGINT        NULL,
    [CreatedDate]    DATETIME      NULL,
    [UpdatedBy]      BIGINT        NULL,
    [UpdatedDate]    DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([LoginId] ASC)
);



