USE [TollGateDb]
SELECT 
*
FROM [dbo].[PaymentHistories]
WHERE
  [userId] = @userId
  
ORDER BY
       [CreatedDate];
 