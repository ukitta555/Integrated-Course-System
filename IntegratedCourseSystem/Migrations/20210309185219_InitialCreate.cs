using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace IntegratedCourseSystem.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.CreateTable(
                name: "faculties",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faculties", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subjects",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subjects", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "techs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_techs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "admins",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admins", x => x.id);
                    table.ForeignKey(
                        name: "admins_id_fkey",
                        column: x => x.id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "students",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_students", x => x.id);
                    table.ForeignKey(
                        name: "students_id_fkey",
                        column: x => x.id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teachers",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    surname = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    facultyid = table.Column<int>(type: "integer", nullable: false),
                    isverified = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teachers", x => x.id);
                    table.ForeignKey(
                        name: "teachers_facultyid_fkey",
                        column: x => x.facultyid,
                        principalTable: "faculties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teachers_id_fkey",
                        column: x => x.id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "classes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    invitecode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    teacherid = table.Column<int>(type: "integer", nullable: false),
                    maxcapacity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classes", x => x.id);
                    table.ForeignKey(
                        name: "classes_teacherid_fkey",
                        column: x => x.teacherid,
                        principalTable: "teachers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "classsubjects",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classid = table.Column<int>(type: "integer", nullable: false),
                    subjectid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classsubjects", x => x.id);
                    table.ForeignKey(
                        name: "classsubjects_classid_fkey",
                        column: x => x.classid,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "classsubjects_subjectid_fkey",
                        column: x => x.subjectid,
                        principalTable: "subjects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "groups",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    classid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_groups", x => x.id);
                    table.ForeignKey(
                        name: "groups_classid_fkey",
                        column: x => x.classid,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "questionnaires",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    studentid = table.Column<int>(type: "integer", nullable: false),
                    classid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_questionnaires", x => x.id);
                    table.ForeignKey(
                        name: "questionnaires_classid_fkey",
                        column: x => x.classid,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "questionnaires_studentid_fkey",
                        column: x => x.studentid,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "grouptechs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    groupid = table.Column<int>(type: "integer", nullable: false),
                    techid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grouptechs", x => x.id);
                    table.ForeignKey(
                        name: "grouptechs_groupid_fkey",
                        column: x => x.groupid,
                        principalTable: "groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "grouptechs_techid_fkey",
                        column: x => x.techid,
                        principalTable: "techs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentgroups",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    groupid = table.Column<int>(type: "integer", nullable: false),
                    studentid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentgroups", x => x.id);
                    table.ForeignKey(
                        name: "studentgroups_groupid_fkey",
                        column: x => x.groupid,
                        principalTable: "groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "studentgroups_studentid_fkey",
                        column: x => x.studentid,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tasks",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classsubjectid = table.Column<int>(type: "integer", nullable: false),
                    groupid = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    maxgrade = table.Column<int>(type: "integer", nullable: false),
                    actualgrade = table.Column<int>(type: "integer", nullable: false),
                    taskdescription = table.Column<string>(type: "text", nullable: true),
                    deadline = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    posted = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    done = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tasks", x => x.id);
                    table.ForeignKey(
                        name: "tasks_classsubjectid_fkey",
                        column: x => x.classsubjectid,
                        principalTable: "classsubjects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "tasks_groupid_fkey",
                        column: x => x.groupid,
                        principalTable: "groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rolepreferences",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    questionnaireid = table.Column<int>(type: "integer", nullable: false),
                    roleid = table.Column<int>(type: "integer", nullable: false),
                    preferencelevel = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rolepreferences", x => x.id);
                    table.ForeignKey(
                        name: "rolepreferences_questionnaireid_fkey",
                        column: x => x.questionnaireid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "rolepreferences_roleid_fkey",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentroleperiods",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    questionnaireid = table.Column<int>(type: "integer", nullable: false),
                    roleid = table.Column<int>(type: "integer", nullable: false),
                    datestart = table.Column<DateTime>(type: "date", nullable: false),
                    dateend = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentroleperiods", x => x.id);
                    table.ForeignKey(
                        name: "studentroleperiods_questionnaireid_fkey",
                        column: x => x.questionnaireid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "studentroleperiods_roleid_fkey",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "subjectquestionnaires",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    classsubjectid = table.Column<int>(type: "integer", nullable: false),
                    questionnaireid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subjectquestionnaires", x => x.id);
                    table.ForeignKey(
                        name: "subjectquestionnaires_classsubjectid_fkey",
                        column: x => x.classsubjectid,
                        principalTable: "classsubjects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "subjectquestionnaires_questionnaireid_fkey",
                        column: x => x.questionnaireid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teammateantipreferences",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    initiatorid = table.Column<int>(type: "integer", nullable: false),
                    enemyid1 = table.Column<int>(type: "integer", nullable: false),
                    enemyid2 = table.Column<int>(type: "integer", nullable: false),
                    enemyid3 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teammateantipreferences", x => x.id);
                    table.ForeignKey(
                        name: "teammateantipreferences_enemyid1_fkey",
                        column: x => x.enemyid1,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammateantipreferences_enemyid2_fkey",
                        column: x => x.enemyid2,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammateantipreferences_enemyid3_fkey",
                        column: x => x.enemyid3,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammateantipreferences_initiatorid_fkey",
                        column: x => x.initiatorid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teammatepreferences",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    initiatorid = table.Column<int>(type: "integer", nullable: false),
                    friendid1 = table.Column<int>(type: "integer", nullable: false),
                    friendid2 = table.Column<int>(type: "integer", nullable: false),
                    friendid3 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teammatepreferences", x => x.id);
                    table.ForeignKey(
                        name: "teammatepreferences_friendid1_fkey",
                        column: x => x.friendid1,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammatepreferences_friendid2_fkey",
                        column: x => x.friendid2,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammatepreferences_friendid3_fkey",
                        column: x => x.friendid3,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "teammatepreferences_initiatorid_fkey",
                        column: x => x.initiatorid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "techpreferences",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    questionnaireid = table.Column<int>(type: "integer", nullable: false),
                    techid = table.Column<int>(type: "integer", nullable: false),
                    preferencelevel = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_techpreferences", x => x.id);
                    table.ForeignKey(
                        name: "techpreferences_questionnaireid_fkey",
                        column: x => x.questionnaireid,
                        principalTable: "questionnaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "techpreferences_techid_fkey",
                        column: x => x.techid,
                        principalTable: "techs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    taskid = table.Column<int>(type: "integer", nullable: false),
                    text = table.Column<string>(type: "text", nullable: false),
                    userid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.id);
                    table.ForeignKey(
                        name: "comments_taskid_fkey",
                        column: x => x.taskid,
                        principalTable: "tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "comments_userid_fkey",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_classes_teacherid",
                table: "classes",
                column: "teacherid");

            migrationBuilder.CreateIndex(
                name: "IX_classsubjects_classid",
                table: "classsubjects",
                column: "classid");

            migrationBuilder.CreateIndex(
                name: "IX_classsubjects_subjectid",
                table: "classsubjects",
                column: "subjectid");

            migrationBuilder.CreateIndex(
                name: "IX_comments_taskid",
                table: "comments",
                column: "taskid");

            migrationBuilder.CreateIndex(
                name: "IX_comments_userid",
                table: "comments",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_groups_classid",
                table: "groups",
                column: "classid");

            migrationBuilder.CreateIndex(
                name: "IX_grouptechs_groupid",
                table: "grouptechs",
                column: "groupid");

            migrationBuilder.CreateIndex(
                name: "IX_grouptechs_techid",
                table: "grouptechs",
                column: "techid");

            migrationBuilder.CreateIndex(
                name: "IX_questionnaires_classid",
                table: "questionnaires",
                column: "classid");

            migrationBuilder.CreateIndex(
                name: "IX_questionnaires_studentid",
                table: "questionnaires",
                column: "studentid");

            migrationBuilder.CreateIndex(
                name: "IX_rolepreferences_questionnaireid",
                table: "rolepreferences",
                column: "questionnaireid");

            migrationBuilder.CreateIndex(
                name: "IX_rolepreferences_roleid",
                table: "rolepreferences",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "IX_studentgroups_groupid",
                table: "studentgroups",
                column: "groupid");

            migrationBuilder.CreateIndex(
                name: "IX_studentgroups_studentid",
                table: "studentgroups",
                column: "studentid");

            migrationBuilder.CreateIndex(
                name: "IX_studentroleperiods_questionnaireid",
                table: "studentroleperiods",
                column: "questionnaireid");

            migrationBuilder.CreateIndex(
                name: "IX_studentroleperiods_roleid",
                table: "studentroleperiods",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "IX_subjectquestionnaires_classsubjectid",
                table: "subjectquestionnaires",
                column: "classsubjectid");

            migrationBuilder.CreateIndex(
                name: "IX_subjectquestionnaires_questionnaireid",
                table: "subjectquestionnaires",
                column: "questionnaireid");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_classsubjectid",
                table: "tasks",
                column: "classsubjectid");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_groupid",
                table: "tasks",
                column: "groupid");

            migrationBuilder.CreateIndex(
                name: "IX_teachers_facultyid",
                table: "teachers",
                column: "facultyid");

            migrationBuilder.CreateIndex(
                name: "IX_teammateantipreferences_enemyid1",
                table: "teammateantipreferences",
                column: "enemyid1");

            migrationBuilder.CreateIndex(
                name: "IX_teammateantipreferences_enemyid2",
                table: "teammateantipreferences",
                column: "enemyid2");

            migrationBuilder.CreateIndex(
                name: "IX_teammateantipreferences_enemyid3",
                table: "teammateantipreferences",
                column: "enemyid3");

            migrationBuilder.CreateIndex(
                name: "IX_teammateantipreferences_initiatorid",
                table: "teammateantipreferences",
                column: "initiatorid");

            migrationBuilder.CreateIndex(
                name: "IX_teammatepreferences_friendid1",
                table: "teammatepreferences",
                column: "friendid1");

            migrationBuilder.CreateIndex(
                name: "IX_teammatepreferences_friendid2",
                table: "teammatepreferences",
                column: "friendid2");

            migrationBuilder.CreateIndex(
                name: "IX_teammatepreferences_friendid3",
                table: "teammatepreferences",
                column: "friendid3");

            migrationBuilder.CreateIndex(
                name: "IX_teammatepreferences_initiatorid",
                table: "teammatepreferences",
                column: "initiatorid");

            migrationBuilder.CreateIndex(
                name: "IX_techpreferences_questionnaireid",
                table: "techpreferences",
                column: "questionnaireid");

            migrationBuilder.CreateIndex(
                name: "IX_techpreferences_techid",
                table: "techpreferences",
                column: "techid");
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.DropTable(
                name: "admins");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "grouptechs");

            migrationBuilder.DropTable(
                name: "rolepreferences");

            migrationBuilder.DropTable(
                name: "studentgroups");

            migrationBuilder.DropTable(
                name: "studentroleperiods");

            migrationBuilder.DropTable(
                name: "subjectquestionnaires");

            migrationBuilder.DropTable(
                name: "teammateantipreferences");

            migrationBuilder.DropTable(
                name: "teammatepreferences");

            migrationBuilder.DropTable(
                name: "techpreferences");

            migrationBuilder.DropTable(
                name: "tasks");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "questionnaires");

            migrationBuilder.DropTable(
                name: "techs");

            migrationBuilder.DropTable(
                name: "classsubjects");

            migrationBuilder.DropTable(
                name: "groups");

            migrationBuilder.DropTable(
                name: "students");

            migrationBuilder.DropTable(
                name: "subjects");

            migrationBuilder.DropTable(
                name: "classes");

            migrationBuilder.DropTable(
                name: "teachers");

            migrationBuilder.DropTable(
                name: "faculties");

            migrationBuilder.DropTable(
                name: "users");
            
        }
    }
}
