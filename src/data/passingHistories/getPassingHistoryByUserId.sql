USE [TollGateDb]
SELECT *
  FROM [dbo].[PassingHistories]
WHERE
  [userId] = @userId
  
ORDER BY
       [CreatedDate];
 