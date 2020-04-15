USE [TollGateDb]
 

INSERT INTO [dbo].[Users]
           ([Username]
           ,[Password]
           ,[ConfirmPassword]
           ,[Email]
           ,[CreatedDate]
           ,[LastLoginDate])
     VALUES
           (@Username
           ,@Password
           ,@ConfirmPassword
           ,@Email
           ,CAST(@CreatedDate AS DateTime2)
           ,CAST(@LastLoginDate AS DateTime2))
 

