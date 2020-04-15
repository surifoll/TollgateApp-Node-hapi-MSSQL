USE [TollGateDb]
SELECT
  *
FROM [dbo].[Vehicles]
WHERE
  [VehicleId] = @id
  
ORDER BY
       [CreatedDate];
 