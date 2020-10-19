CREATE TABLE [dbo].[UserLoginMapping] (
    [Userloginmappingid] BIGINT   IDENTITY (1, 1) NOT NULL,
    [UserId]             BIGINT   NULL,
    [LoginId]            BIGINT   NULL,
    [IsActive]           BIT      NULL,
    [CreatedBy]          BIGINT   NULL,
    [CreatedDate]        DATETIME NULL,
    [UpdatedBy]          BIGINT   NULL,
    [UpdatedDate]        DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Userloginmappingid] ASC),
    FOREIGN KEY ([LoginId]) REFERENCES [dbo].[LoginDetail] ([LoginId]),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[UserDetails] ([UserId])
);



