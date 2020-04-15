USE [TollGateDb]
SELECT
  [UserId],
  [Username],
  [Password],
  [ConfirmPassword],
  [Email],
  [CreatedDate],
  [LastLoginDate]
FROM [dbo].[Users]
WHERE
  [userId] = @userId
  
ORDER BY
       [CreatedDate], [LastLoginDate];
 