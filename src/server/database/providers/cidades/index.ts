import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as UpdateId from './UpdateById';
import * as DeleteById from './DeleteById';
import * as Count from './Count';


export const CidadesProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...UpdateId,
  ...DeleteById,
  ...Count
};