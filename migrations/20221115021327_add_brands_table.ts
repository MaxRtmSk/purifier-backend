import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE brands (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      title text NOT NULL
    )
    `);
  await knex.raw(`ALTER TABLE products ADD COLUMN "brandId" int REFERENCES brands(id)`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  ALTER TABLE products
    DROP COLUMN "brandId";
  `);
  return knex.raw(`DROP TABLE brands`);
}
