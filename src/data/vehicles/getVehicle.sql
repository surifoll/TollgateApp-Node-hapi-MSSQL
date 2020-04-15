USE [TollGateDb]
SELECT
  [VehicleId],
  [UserId],
  [Name],
  [PlateNo],
  [CreatedDate],
  [LastLoginDate]
FROM [dbo].[Vehicles]
WHERE
  [VehicleId] = @id
  
ORDER BY
       [CreatedDate], [LastLoginDate];
 