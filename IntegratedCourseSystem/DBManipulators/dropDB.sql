-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS Users                   CASCADE;
DROP TABLE IF EXISTS Admins                  CASCADE;
DROP TABLE IF EXISTS Teachers                CASCADE;
DROP TABLE IF EXISTS Students                CASCADE;
DROP TABLE IF EXISTS Questionnaires          CASCADE;
DROP TABLE IF EXISTS TeammatePreferences     CASCADE;
DROP TABLE IF EXISTS TeammateAntipreferences CASCADE;
DROP TABLE IF EXISTS Roles                   CASCADE;
DROP TABLE IF EXISTS Techs                   CASCADE;
DROP TABLE IF EXISTS TechPreferences         CASCADE;
DROP TABLE IF EXISTS RolePreferences         CASCADE;
DROP TABLE IF EXISTS StudentRolePeriods      CASCADE;
DROP TABLE IF EXISTS Subjects                CASCADE;
DROP TABLE IF EXISTS ClassSubjects           CASCADE;
DROP TABLE IF EXISTS Classes                 CASCADE;
DROP TABLE IF EXISTS SubjectQuestionnaires   CASCADE;
DROP TABLE IF EXISTS Comments                CASCADE;
DROP TABLE IF EXISTS Tasks                   CASCADE;
DROP TABLE IF EXISTS StudentGroups           CASCADE;
DROP TABLE IF EXISTS Groups                  CASCADE;
DROP TABLE IF EXISTS GroupTechs              CASCADE;