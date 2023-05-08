using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tourism_Agency_AspNet_Web_Api.Migrations
{
    /// <inheritdoc />
    public partial class Updatev2Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "TourItems",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TourItems",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "TourItems",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TourItems",
                newName: "id");
        }
    }
}
