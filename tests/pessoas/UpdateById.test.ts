import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - UpdateById', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'update-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });





  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });

  it('Atualiza registro', async () => {
    const res1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({
      nomeCompleto: 'leonardo sarquiz huge',
      email: 'leosarquizhugep@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/pessoas/${res1.body}`)
      .send({ nomeCompleto: 'Pedro', email: 'leocoleraus@gmail.com', cidadeId });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });


  it('Tenta atualizar registro que não existe', async () => {
    const res1 = await testServer.put('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}` }).send({
      nomeCompleto: 'Manir'
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


}); 