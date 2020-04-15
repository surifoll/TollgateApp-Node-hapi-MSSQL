USE [TollGateDb]
INSERT INTO [dbo].[Vehicles] (
    [UserId],
    [Name],
    [PlateNo],
    [CreatedDate],
    [LastLoginDate]
  )
VALUES
  (
    @UserId,
    @Name,
    @PlateNo,
    CAST(@CreatedDate AS DateTime2),
    CAST(@LastLoginDate AS DateTime2)
  )