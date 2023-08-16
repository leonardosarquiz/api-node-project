/* eslint-disable linebreak-style */
import * as yup from 'yup';
import { Request, Response } from 'express';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';



interface IParamProps {
  id?: number;

}



export const deleteValidation = validation((getSchema) => (
  {
    params: getSchema<IParamProps>(yup.object().shape({
      id: yup.number().integer().required().moreThan(0),

    })),

  }
));



export const deleteById = async (req: Request<IParamProps>, res: Response) => {

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    erros: {
      default: 'Registro não encontrado'
    }
  });




  return res.status(StatusCodes.NO_CONTENT).send();

};