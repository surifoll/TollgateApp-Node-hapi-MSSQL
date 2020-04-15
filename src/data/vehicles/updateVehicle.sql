USE [TollGateDb]
UPDATE [dbo].[Vehicles]
SET
  [UserId] = @UserId,
  [Name] = @Name,
  [PlateNo] = @PlateNo,
  [CreatedDate] = CAST(@CreatedDate AS DateTime2),
  [LastLoginDate] = CAST(@LastLoginDate AS DateTime2)
WHERE
  [VehicleId] = @id