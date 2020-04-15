USE [TollGateDb]

DELETE FROM [dbo].[Vehicles]
WHERE
  [VehicleId] = @id