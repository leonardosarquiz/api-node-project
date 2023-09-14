import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetById', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'getbyid-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });




  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });


  it('Busca registro por id', async () => {
    const res1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({
      nomeCompleto: 'leonardo sarquiz huge',
      email: 'leosarquizhuge@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');
  });


  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer.get('/cidades/99999').set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


}); 