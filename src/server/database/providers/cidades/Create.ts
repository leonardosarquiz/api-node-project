import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';



export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {

  try {
    const [result] = await Knex(EtableNames.cidade).insert(cidade).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('erro ao cadastrar o registro');


  } catch (error) {
    console.log(error);
    return new Error('erro ao cadastrar o registro');
  }


};