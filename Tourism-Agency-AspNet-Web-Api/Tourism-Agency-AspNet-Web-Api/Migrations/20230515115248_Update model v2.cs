using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tourism_Agency_AspNet_Web_Api.Migrations
{
    /// <inheritdoc />
    public partial class Updatemodelv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "TourItemDetail",
                newName: "ShortDescription");

            migrationBuilder.AddColumn<string>(
                name: "LongDescription",
                table: "TourItemDetail",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LongDescription",
                table: "TourItemDetail");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "TourItemDetail",
                newName: "Description");
        }
    }
}
