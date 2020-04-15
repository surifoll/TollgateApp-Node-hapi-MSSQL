USE [TollGateDb]
SELECT *
  FROM [dbo].[PassingHistories]
WHERE
  [PassingHistoryId] = @id
  
ORDER BY
       [CreatedDate];
 