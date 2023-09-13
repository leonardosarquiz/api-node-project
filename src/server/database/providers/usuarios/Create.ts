import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';



export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {

  try {
    const [result] = await Knex(EtableNames.usuario).insert(usuario).returning('id');

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