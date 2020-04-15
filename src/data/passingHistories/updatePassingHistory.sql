USE [TollGateDb]
UPDATE [dbo].[PassingHistories]
   SET [UserId] = @UserId 
      ,[Amount] = @Amount 
      ,[AvailableBalance] = @AvailableBalance 
      ,[CreatedDate] = @CreatedDate 
      ,[Status] = @Status 
 WHERE
  [PassingHistoriyIdy] = @id
  