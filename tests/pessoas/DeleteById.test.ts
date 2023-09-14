import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - DeleteById', () => {
  let accessToken = '';

  beforeAll(async () => {
    const email = 'delete-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });



  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });

  it('Apaga registro', async () => {
    const res1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({
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
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


}); 