USE [TollGateDb]
UPDATE [dbo].[Users]
SET
  [Username] = @Username,
  [Password] = @Password,
  [ConfirmPassword] = @ConfirmPassword,
  [Email] = @Email,
  [CreatedDate] = CAST(@CreatedDate AS DateTime2),
  [LastLoginDate] = CAST(@LastLoginDate AS DateTime2)
WHERE
  [userId] = @userId