using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace IntegratedCourseSystem.Migrations
{
    public partial class SubjectTasksAddition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "tasks_classsubjectid_fkey",
                table: "tasks");

            /*
            migrationBuilder.DropIndex(
                name: "IX_tasks_classsubjectid",
                table: "tasks");
            */

            migrationBuilder.DropColumn(
                name: "actualgrade",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "classsubjectid",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "maxgrade",
                table: "tasks");

            migrationBuilder.CreateTable(
                name: "SubjectTask",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MaxGrade = table.Column<int>(type: "integer", nullable: false),
                    ActualGrade = table.Column<int>(type: "integer", nullable: false),
                    ClassSubjectId = table.Column<int>(type: "integer", nullable: false),
                    TaskId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectTask_classsubjects_ClassSubjectId",
                        column: x => x.ClassSubjectId,
                        principalTable: "classsubjects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectTask_tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "tasks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubjectTask_ClassSubjectId",
                table: "SubjectTask",
                column: "ClassSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectTask_TaskId",
                table: "SubjectTask",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubjectTask");

            migrationBuilder.AddColumn<int>(
                name: "actualgrade",
                table: "tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "classsubjectid",
                table: "tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "maxgrade",
                table: "tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tasks_classsubjectid",
                table: "tasks",
                column: "classsubjectid");

            migrationBuilder.AddForeignKey(
                name: "tasks_classsubjectid_fkey",
                table: "tasks",
                column: "classsubjectid",
                principalTable: "classsubjects",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
