
import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(EtableNames.cidade, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).checkLength('<=', 150).index().notNullable();

    table.comment('Tabela usada para armazenar cidades do sistema.');
  })
    .then(() => {
      console.log(`# created table ${EtableNames.cidade}`);
    });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(EtableNames.cidade)
    .then(() => {
      console.log(`# dropped table ${EtableNames.cidade}`);
    });
}
