import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - GetAll', () => {
  let accessToken = '';

  beforeAll(async () => {
    const email = 'getall-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });


  it('Buscar todos os registros', async () => {
    const res1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: 'caxias do sul'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resBuscada = await testServer
      .get('/cidades')
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });




}); 