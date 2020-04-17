USE [TollGateDb]
UPDATE [dbo].[Wallets]
   SET [UserId] = @UserId 
      ,[AvailableBalance] = @AvailableBalance 
       
      ,[LastUpdatedDate] = @LastUpdatedDate 
WHERE
  [WalletId] = @id