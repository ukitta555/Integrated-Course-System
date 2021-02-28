-- noinspection SqlNoDataSourceInspectionForFile
CREATE TABLE IF NOT EXISTS Users
(
    Id                 SERIAL       PRIMARY KEY     NOT NULL,
    Role               INT                          NOT NULL,
    Login              VARCHAR(50)                  NOT NULL,
    Password           VARCHAR(256)                 NOT NULL
);

CREATE TABLE IF NOT EXISTS Admins
(
    Id                 SERIAL       PRIMARY KEY     NOT NULL,

    FOREIGN KEY (Id) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Teachers
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL,
    Surname            VARCHAR(50)                 NOT NULL,
    Faculty            VARCHAR(100)                        ,
    IsVerified         BOOLEAN                             ,

    FOREIGN KEY (Id) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Students
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL,
    Surname            VARCHAR(50)                 NOT NULL,

    FOREIGN KEY (Id) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Classes
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL,
    InviteCode         VARCHAR(10)                 NOT NULL,
    TeacherId          SERIAL                      NOT NULL,
    MaxCapacity        INT                         NOT NULL,

    FOREIGN KEY (TeacherId) REFERENCES Teachers(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Subjects
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL
);

CREATE TABLE IF NOT EXISTS Roles
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL
);

CREATE TABLE IF NOT EXISTS Techs
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL
);

CREATE TABLE IF NOT EXISTS Groups
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    Name               VARCHAR(50)                 NOT NULL,
    ClassId            SERIAL                      NOT NULL,

    FOREIGN KEY (ClassId) REFERENCES Classes(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Questionnaires
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    StudentId          SERIAL                      NOT NULL,
    ClassId            SERIAL                      NOT NULL,

    FOREIGN KEY (StudentId) REFERENCES Students(Id) ON DELETE CASCADE,
    FOREIGN KEY (ClassId)   REFERENCES Classes(Id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TechPreferences
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    QuestionnaireId    SERIAL                      NOT NULL,
    TechId             SERIAL                      NOT NULL,
    PreferenceLevel    INT                         NOT NULL,

    FOREIGN KEY (QuestionnaireId) REFERENCES Questionnaires(Id) ON DELETE CASCADE,
    FOREIGN KEY (TechId)          REFERENCES Techs(Id)          ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RolePreferences
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    QuestionnaireId    SERIAL                      NOT NULL,
    RoleId             SERIAL                      NOT NULL,
    PreferenceLevel    INT                         NOT NULL,

    FOREIGN KEY (QuestionnaireId) REFERENCES Questionnaires(Id) ON DELETE CASCADE,
    FOREIGN KEY (RoleId)          REFERENCES Roles(Id)          ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TeammatePreferences
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    InitiatorId        SERIAL                      NOT NULL,
    FriendId1          SERIAL                      NOT NULL,
    FriendId2          SERIAL                              ,
    FriendId3          SERIAL                              ,

    FOREIGN KEY (InitiatorId) REFERENCES Questionnaires(Id) ON DELETE CASCADE,
    FOREIGN KEY (FriendId1)   REFERENCES Students(Id)       ON DELETE CASCADE,
    FOREIGN KEY (FriendId2)   REFERENCES Students(Id)       ON DELETE CASCADE,
    FOREIGN KEY (FriendId3)   REFERENCES Students(Id)       ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TeammateAntipreferences
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    InitiatorId        SERIAL                      NOT NULL,
    EnemyId1           SERIAL                      NOT NULL,
    EnemyId2           SERIAL                              ,
    EnemyId3           SERIAL                              ,

    FOREIGN KEY (InitiatorId) REFERENCES Questionnaires(Id) ON DELETE CASCADE,
    FOREIGN KEY (EnemyId1)    REFERENCES Students(Id)       ON DELETE CASCADE,
    FOREIGN KEY (EnemyId2)    REFERENCES Students(Id)       ON DELETE CASCADE,
    FOREIGN KEY (EnemyId3)    REFERENCES Students(Id)       ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS GroupTechs
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    GroupId            SERIAL                      NOT NULL,
    TechId             SERIAL                      NOT NULL,

    FOREIGN KEY (GroupId)  REFERENCES Groups(Id) ON DELETE CASCADE,
    FOREIGN KEY (TechId)   REFERENCES Techs(Id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS StudentGroups
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    GroupId            SERIAL                      NOT NULL,
    StudentId          SERIAL                      NOT NULL,

    FOREIGN KEY (GroupId)     REFERENCES Groups(Id)   ON DELETE CASCADE,
    FOREIGN KEY (StudentId)   REFERENCES Students(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS StudentRolePeriods
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    QuestionnaireId    SERIAL                      NOT NULL,
    RoleId             SERIAL                      NOT NULL,
    DateStart          DATE                        NOT NULL,
    DateEnd            DATE                        NOT NULL,

    FOREIGN KEY (QuestionnaireId) REFERENCES Questionnaires(Id) ON DELETE CASCADE,
    FOREIGN KEY (RoleId)          REFERENCES Roles(Id)          ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ClassSubjects
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    ClassId            SERIAL                      NOT NULL,
    SubjectId          SERIAL                      NOT NULL,

    FOREIGN KEY (ClassId)     REFERENCES Classes(Id)  ON DELETE CASCADE,
    FOREIGN KEY (SubjectId)   REFERENCES Subjects(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SubjectQuestionnaires
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    ClassSubjectId     SERIAL                      NOT NULL,
    QuestionnaireId    SERIAL                      NOT NULL,

    FOREIGN KEY (ClassSubjectId)  REFERENCES ClassSubjects(Id)  ON DELETE CASCADE,
    FOREIGN KEY (QuestionnaireId) REFERENCES Questionnaires(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tasks
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    ClassSubjectId     SERIAL                      NOT NULL,
    GroupId            SERIAL                      NOT NULL,
    Name               VARCHAR(50)                 NOT NULL,
    MaxGrade           INT                         NOT NULL,
    ActualGrade        INT                         NOT NULL,
    TaskDescription    TEXT                                ,
    DeadLine           TIMESTAMP                           ,
    Posted             TIMESTAMP                   NOT NULL,
    Done               TIMESTAMP                           ,

    FOREIGN KEY (ClassSubjectId) REFERENCES ClassSubjects(Id) ON DELETE CASCADE,
    FOREIGN KEY (GroupId)        REFERENCES Groups(Id)        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comments
(
    Id                 SERIAL      PRIMARY KEY     NOT NULL,
    TaskId             SERIAL                      NOT NULL,
    Text               TEXT                        NOT NULL,
    UserId             SERIAL                      NOT NULL,

    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (TaskId) REFERENCES Tasks(Id) ON DELETE CASCADE
);