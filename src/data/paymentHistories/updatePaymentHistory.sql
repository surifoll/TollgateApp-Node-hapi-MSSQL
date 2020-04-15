USE [TollGateDb]
UPDATE [dbo].[PaymentHistories]
   SET [UserId] = @UserId  
      ,[Amount] = @Amount 
      ,[AvailableBalance] = @AvailableBalance 
      ,[CreatedDate] = @CreatedDate 
      ,[Status] = @Status 
WHERE
  [PaymentHistoryId] = @id
  