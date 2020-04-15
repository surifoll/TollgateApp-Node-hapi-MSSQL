USE [TollGateDb]

DELETE FROM [dbo].[PassingHistories]
WHERE
  [PassingHistoryId] = @id