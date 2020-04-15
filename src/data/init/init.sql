use  [TollGateDb]

/****** Object:  Table [dbo].[PassingHistories]    Script Date: 15/04/2020 18:26:57 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[PassingHistories](
	[PassingHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[AvailableBalance] [decimal](18, 2) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[Status] [nvarchar](max) NULL,
 CONSTRAINT [PK_PassingHistories] PRIMARY KEY CLUSTERED 
(
	[PassingHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

/****** Object:  Table [dbo].[PaymentHistories]    Script Date: 15/04/2020 18:26:57 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[PaymentHistories](
	[PaymentHistoryId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[AvailableBalance] [decimal](18, 2) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[Status] [nvarchar](max) NULL,
	[Ref] [nvarchar](max) NULL,
 CONSTRAINT [PK_PaymentHistories] PRIMARY KEY CLUSTERED 
(
	[PaymentHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

/****** Object:  Table [dbo].[Users]    Script Date: 15/04/2020 18:26:57 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[ConfirmPassword] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastLoginDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

/****** Object:  Table [dbo].[Vehicles]    Script Date: 15/04/2020 18:26:57 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Vehicles](
	[VehicleId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[PlateNo] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastLoginDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
(
	[VehicleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

/****** Object:  Table [dbo].[Wallets]    Script Date: 15/04/2020 18:26:57 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Wallets](
	[WalletId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[AvailableBalance] [decimal](18, 2) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastUpdatedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Wallets] PRIMARY KEY CLUSTERED 
(
	[WalletId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PassingHistories]  WITH CHECK ADD  CONSTRAINT [FK_PassingHistories_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE

ALTER TABLE [dbo].[PassingHistories] CHECK CONSTRAINT [FK_PassingHistories_Users_UserId]

ALTER TABLE [dbo].[PaymentHistories]  WITH CHECK ADD  CONSTRAINT [FK_PaymentHistories_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE

ALTER TABLE [dbo].[PaymentHistories] CHECK CONSTRAINT [FK_PaymentHistories_Users_UserId]

ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK_Vehicles_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE

ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_Users_UserId]

ALTER TABLE [dbo].[Wallets]  WITH CHECK ADD  CONSTRAINT [FK_Wallets_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE

ALTER TABLE [dbo].[Wallets] CHECK CONSTRAINT [FK_Wallets_Users_UserId]

