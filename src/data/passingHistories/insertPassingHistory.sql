USE [TollGateDb]
INSERT INTO [dbo].[PassingHistories]
           ([UserId]
           ,[Amount]
           ,[AvailableBalance]
           ,[CreatedDate]
           ,[Status])
     VALUES
           (@UserId
           ,@Amount
           ,@AvailableBalance
           , CAST(@CreatedDate AS DateTime2)
           ,@Status)
  