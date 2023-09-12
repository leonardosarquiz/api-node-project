
import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(EtableNames.pessoa, table => {
    table.bigIncrements('id').primary().index();
    table.string('nomeCompleto').index().notNullable();
    table.string('email').unique().notNullable();

    table.bigInteger('cidadeId').index().notNullable().references('id').inTable(EtableNames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');


    table.comment('Tabela usada para armazenar pessoas do sistema.');
  })
    .then(() => {
      console.log(`# created table ${EtableNames.pessoa}`);
    });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(EtableNames.pessoa)
    .then(() => {
      console.log(`# dropped table ${EtableNames.pessoa}`);
    });
}
