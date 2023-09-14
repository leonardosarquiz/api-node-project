import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetAll', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'getall-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });


  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });


  it('Buscar todos os registros', async () => {
    const res1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({
      nomeCompleto: 'leonardo sarquiz huge',
      email: 'leosarquizhuge@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resBuscada = await testServer
      .get('/pessoas')
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });




}); 