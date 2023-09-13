import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - DeleteById', () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });

  it('Apaga registro', async () => {
    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'leonardo sarquiz huge',
      email: 'leosarquizhuge@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagada = await testServer
      .delete(`/cidades/${res1.body}`)
      .send();

    expect(resApagada.status).toEqual(StatusCodes.NO_CONTENT);
  });


  it('Tenta apagar registro que não existe', async () => {

    const res1 = await testServer
      .delete('/pessoas/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


}); 