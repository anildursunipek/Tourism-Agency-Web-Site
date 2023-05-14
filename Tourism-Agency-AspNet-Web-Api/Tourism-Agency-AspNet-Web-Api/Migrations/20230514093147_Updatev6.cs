using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tourism_Agency_AspNet_Web_Api.Migrations
{
    /// <inheritdoc />
    public partial class Updatev6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TourItems_TourItemId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_TourItemDetail_TourItemId",
                table: "TourItemDetail");

            migrationBuilder.DropColumn(
                name: "PersonCount",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Tours",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tours",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "categoryId",
                table: "Tours",
                newName: "CategoryTourId");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "TourItemDetail",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "TourItemDetail",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "address",
                table: "TourItemDetail",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TourItemDetail",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Comments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "Comments",
                newName: "Description");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "TourItemId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_TourItemDetail_TourItemId",
                table: "TourItemDetail",
                column: "TourItemId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TourItems_TourItemId",
                table: "Comments",
                column: "TourItemId",
                principalTable: "TourItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TourItems_TourItemId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_TourItemDetail_TourItemId",
                table: "TourItemDetail");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tours",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Tours",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "CategoryTourId",
                table: "Tours",
                newName: "categoryId");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "TourItemDetail",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "TourItemDetail",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "TourItemDetail",
                newName: "address");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TourItemDetail",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Comments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Comments",
                newName: "comment");

            migrationBuilder.AddColumn<int>(
                name: "PersonCount",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "TourItemId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TourItemDetail_TourItemId",
                table: "TourItemDetail",
                column: "TourItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TourItems_TourItemId",
                table: "Comments",
                column: "TourItemId",
                principalTable: "TourItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
