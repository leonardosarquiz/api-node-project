import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

// como não retorna nada por isso é void

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(EtableNames.cidade)
      .update(cidade)
      .where('id', '=', id);


    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro');
  }
};