USE [TollGateDb]
SELECT 
*
FROM [dbo].[PaymentHistories]
WHERE
  [Ref] = @ref
  
ORDER BY
       [CreatedDate];
 