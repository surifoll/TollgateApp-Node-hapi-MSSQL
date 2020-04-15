USE [TollGateDb]
SELECT [WalletId]
      ,[UserId]
      ,[AvailableBalance]
      ,[CreatedDate]
      ,[LastUpdatedDate]
  FROM [dbo].[Wallets]
WHERE
  [userId] = @userId
  
ORDER BY
       [CreatedDate], [LastUpdatedDate];
 