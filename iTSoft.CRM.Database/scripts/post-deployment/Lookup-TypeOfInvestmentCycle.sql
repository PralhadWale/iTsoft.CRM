USE [CRM]
GO
SET IDENTITY_INSERT [dbo].[TypeOfInvestmentCycle] ON 

GO
INSERT [dbo].[TypeOfInvestmentCycle] ([Code], [Name], [IsActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (N'Submission', N'Submission', 1, 1, CAST(N'2020-10-11 00:00:00.000' AS DateTime), 1, CAST(N'2020-10-11 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[TypeOfInvestmentCycle] ([Code], [Name], [IsActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (N'Declare', N'Declaration', 1, 1, CAST(N'2020-10-11 10:16:11.863' AS DateTime), 1, CAST(N'2020-10-11 10:16:11.863' AS DateTime))
GO
INSERT [dbo].[TypeOfInvestmentCycle] ([Code], [Name], [IsActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (N'Claim', N'Claims', 1, 1, CAST(N'2020-10-11 10:16:26.740' AS DateTime), 1, CAST(N'2020-10-11 10:16:26.740' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[TypeOfInvestmentCycle] OFF
GO
