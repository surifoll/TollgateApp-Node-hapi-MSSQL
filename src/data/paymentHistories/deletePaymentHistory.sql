USE [TollGateDb]

DELETE FROM [dbo].[PaymentHistories]
WHERE
  [PaymentHistoryId] = @id