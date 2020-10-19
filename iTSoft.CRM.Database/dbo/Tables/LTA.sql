CREATE TABLE [dbo].[LTA] (
    [LtaId]             BIGINT        IDENTITY (1, 1) NOT NULL,
    [JourneyStartPlace] VARCHAR (200) NULL,
    [JourneyEndPlace]   VARCHAR (200) NULL,
    [JourneyStartDate]  DATETIME      NULL,
    [JourneYEndDate]    DATETIME      NULL,
    [JourneyMode]       VARCHAR (100) NULL,
    [IsActive]          BIT           NULL,
    [CreatedBy]         BIGINT        NULL,
    [CreatedDate]       DATETIME      NULL,
    [UpdatedBy]         BIGINT        NULL,
    [UpdatedDate]       DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([LtaId] ASC)
);



