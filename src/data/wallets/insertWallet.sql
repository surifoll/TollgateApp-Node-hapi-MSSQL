USE [TollGateDb]
INSERT INTO [dbo].[Wallets] (
    [UserId],
    [AvailableBalance],
    [CreatedDate],
    [LastUpdatedDate]
  )
VALUES
  (
    @UserId,
    @AvailableBalance,
    CAST(@CreatedDate AS DateTime2),
     
  )