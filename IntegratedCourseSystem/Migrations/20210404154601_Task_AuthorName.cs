using Microsoft.EntityFrameworkCore.Migrations;

namespace IntegratedCourseSystem.Migrations
{
    public partial class Task_AuthorName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorName",
                table: "tasks",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorName",
                table: "tasks");
        }
    }
}
