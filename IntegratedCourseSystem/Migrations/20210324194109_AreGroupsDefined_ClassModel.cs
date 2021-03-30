using Microsoft.EntityFrameworkCore.Migrations;

namespace IntegratedCourseSystem.Migrations
{
    public partial class AreGroupsDefined_ClassModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "teammateantipreferences_enemyid2_fkey",
                table: "teammateantipreferences");

            migrationBuilder.DropForeignKey(
                name: "teammateantipreferences_enemyid3_fkey",
                table: "teammateantipreferences");

            migrationBuilder.AlterColumn<int>(
                name: "enemyid3",
                table: "teammateantipreferences",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "enemyid2",
                table: "teammateantipreferences",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<bool>(
                name: "AreGroupsDefined",
                table: "classes",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "teammateantipreferences_enemyid2_fkey",
                table: "teammateantipreferences",
                column: "enemyid2",
                principalTable: "students",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "teammateantipreferences_enemyid3_fkey",
                table: "teammateantipreferences",
                column: "enemyid3",
                principalTable: "students",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "teammateantipreferences_enemyid2_fkey",
                table: "teammateantipreferences");

            migrationBuilder.DropForeignKey(
                name: "teammateantipreferences_enemyid3_fkey",
                table: "teammateantipreferences");

            migrationBuilder.DropColumn(
                name: "AreGroupsDefined",
                table: "classes");

            migrationBuilder.AlterColumn<int>(
                name: "enemyid3",
                table: "teammateantipreferences",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "enemyid2",
                table: "teammateantipreferences",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "teammateantipreferences_enemyid2_fkey",
                table: "teammateantipreferences",
                column: "enemyid2",
                principalTable: "students",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "teammateantipreferences_enemyid3_fkey",
                table: "teammateantipreferences",
                column: "enemyid3",
                principalTable: "students",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
