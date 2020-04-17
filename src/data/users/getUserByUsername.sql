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
  [Username] = @username 
  
ORDER BY
       [CreatedDate], [LastLoginDate];
 