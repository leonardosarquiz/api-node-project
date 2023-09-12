/* eslint-disable linebreak-style */
import * as yup from 'yup';
import { Request, Response } from 'express';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';



interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;


}



export const getAllValidation = validation((getSchema) => (
  {
    query: getSchema<IQueryProps>(yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),

    })),

  }
));





export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  // result vai listar todas as pessoas

  const result = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');

  // vai retornar um total numerico de pessoas

  const count = await PessoasProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  // quantidade total de registro que tem no banco de dados

  res.setHeader('acces-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);





  return res.status(StatusCodes.OK).json(result);

};