 -- Code to Sql Server Create Database
IF EXISTS ( SELECT name FROM master.dbo.sysdatabases  WHERE name = N'TollGateDb')
BEGIN
    SELECT 'Database Name already Exist' AS Message
END
ELSE
BEGIN
    CREATE DATABASE [TollGateDb]
     
END
