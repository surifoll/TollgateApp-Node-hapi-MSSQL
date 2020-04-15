USE [TollGateDb]
INSERT INTO [dbo].[PaymentHistories] (
    [UserId],
    [Amount],
    [AvailableBalance],
    [CreatedDate],
    [Status],
    [Ref]
  )
VALUES
  (
    @UserId,
    @Amount,
    @AvailableBalance,
    CAST(@CreatedDate AS DateTime2),
    @Status,
    @Ref
  )