-- ========================================================
-- Script de Banco de Dados: ExoApi
-- Unidade Curricular: UC14 - Desenvolvimento de APIs (SENAI)
-- ========================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ExoApi')
BEGIN
    CREATE DATABASE ExoApi;
END
GO

USE ExoApi;
GO

-- 1. Criação da Tabela de Projetos
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Projetos')
BEGIN
    CREATE TABLE Projetos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        NomeDoProjeto VARCHAR(150) NOT NULL,
        Area VARCHAR(100) NOT NULL,
        Status BIT NOT NULL DEFAULT 1
    );
END
GO

-- 2. Criação da Tabela de Usuários
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Usuarios')
BEGIN
    CREATE TABLE Usuarios (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Email VARCHAR(150) NOT NULL UNIQUE,
        Senha VARCHAR(100) NOT NULL
    );
END
GO

-- 3. Carga Inicial de Dados (Seed Data)
IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE Email = 'admin@exoapi.com')
BEGIN
    INSERT INTO Usuarios (Email, Senha) VALUES 
    ('admin@exoapi.com', '123456'),
    ('dev@exoapi.com', 'senhasegura2026');
END
GO

IF NOT EXISTS (SELECT 1 FROM Projetos WHERE NomeDoProjeto = 'App Mobile ExoGestão')
BEGIN
    INSERT INTO Projetos (NomeDoProjeto, Area, Status) VALUES 
    ('App Mobile ExoGestão', 'Mobile / React Native', 1),
    ('Portal de Integração ERP', 'Backend / Web API', 1),
    ('Módulo de Auditoria e Logs', 'Segurança da Informação', 0);
END
GO

-- Validação dos registros inseridos:
SELECT * FROM Projetos;
SELECT * FROM Usuarios;
GO

