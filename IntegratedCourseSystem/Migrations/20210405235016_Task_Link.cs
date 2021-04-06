using Microsoft.EntityFrameworkCore.Migrations;

namespace IntegratedCourseSystem.Migrations
{
    public partial class Task_Link : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "tasks",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Link",
                table: "tasks");
        }
    }
}
