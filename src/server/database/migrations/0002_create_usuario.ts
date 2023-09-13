
import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex.schema.createTable(EtableNames.usuario, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().checkLength('>=', 3);
    table.string('email').unique().notNullable().checkLength('>=', 5);
    table.string('senha').index().notNullable().checkLength('>=', 6);




    table.comment('Tabela usada para armazenar usuarios do sistema.');
  })
    .then(() => {
      console.log(`# created table ${EtableNames.usuario}`);
    });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(EtableNames.usuario)
    .then(() => {
      console.log(`# dropped table ${EtableNames.usuario}`);
    });
}
