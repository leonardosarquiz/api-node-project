import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as UpdateId from './UpdateId';
import * as DeleteById from './DeleteById';


export const PessoasControler = {
  ...create,
  ...getAll,
  ...getById,
  ...UpdateId,
  ...DeleteById
};