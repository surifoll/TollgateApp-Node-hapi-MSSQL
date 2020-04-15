USE [TollGateDb]
UPDATE [dbo].[Wallets]
   SET [UserId] = @UserId 
      ,[AvailableBalance] = @AvailableBalance 
      ,[CreatedDate] = @CreatedDate 
      ,[LastUpdatedDate] = @LastUpdatedDate 
WHERE
  [WalletId] = @id