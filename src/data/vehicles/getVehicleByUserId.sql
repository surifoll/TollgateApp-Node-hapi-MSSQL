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
  [userId] = @userId
  
ORDER BY
       [CreatedDate], [LastLoginDate];
 