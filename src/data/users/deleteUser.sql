USE [TollGateDb]
DELETE FROM [dbo].[Users]
WHERE
  [userId] = @userId