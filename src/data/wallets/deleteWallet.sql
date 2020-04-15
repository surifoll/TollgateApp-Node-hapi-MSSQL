USE [TollGateDb]

DELETE FROM [dbo].[Wallets]
WHERE
  [WalletId] = @id