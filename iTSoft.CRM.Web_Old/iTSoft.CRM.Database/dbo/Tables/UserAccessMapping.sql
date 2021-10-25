CREATE TABLE [dbo].[UserAccessMapping] (
    [AccessMatrixId]    BIGINT   IDENTITY (1, 1) NOT NULL,
    [AccessId]          BIGINT   NULL,
    [UserRoleMappingId] BIGINT   NULL,
    [IsAllow]           BIT      NULL,
    [IsActive]          BIT      NULL,
    [CreatedBy]         BIGINT   NULL,
    [CreatedDate]       DATETIME NULL,
    [UpdatedBy]         BIGINT   NULL,
    [UpdatedDate]       DATETIME NULL,
    PRIMARY KEY CLUSTERED ([AccessMatrixId] ASC),
    FOREIGN KEY ([AccessId]) REFERENCES [dbo].[AccessDetails] ([AccessId]),
    FOREIGN KEY ([UserRoleMappingId]) REFERENCES [dbo].[UserRoleMapping] ([UserRoleMappingId])
);



