import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';


export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(EtableNames.cidade)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registro');
  }
};