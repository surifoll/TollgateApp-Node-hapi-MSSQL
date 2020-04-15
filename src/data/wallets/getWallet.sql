USE [TollGateDb]
SELECT [WalletId]
      ,[UserId]
      ,[AvailableBalance]
      ,[CreatedDate]
      ,[LastUpdatedDate]
  FROM [dbo].[Wallets]
WHERE
  [WalletId] = @id
  
ORDER BY
       [CreatedDate], [LastUpdatedDate];
 