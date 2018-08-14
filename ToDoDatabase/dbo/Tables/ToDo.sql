CREATE TABLE [dbo].[ToDo] (
    [ID]    INT           IDENTITY (1, 1) NOT NULL,
    [Titel] VARCHAR (50)  NULL,
    [Text]  VARCHAR (200) NULL,
    CONSTRAINT [PK_ToDo] PRIMARY KEY CLUSTERED ([ID] ASC)
);





