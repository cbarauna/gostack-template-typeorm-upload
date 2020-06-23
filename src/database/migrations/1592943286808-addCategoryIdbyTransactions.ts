import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class addCategoryIdbyTransactions1592943286808 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "transaction",
      new TableColumn({
        name: "category_id",
        type: "uuid",
        isNullable: true,
      }),
    )

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["categories_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        name: "TransactionCategory",
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("transactions", "TransactionCategory")
    await queryRunner.dropColumn("transactions", "category_id ")
  }

}
