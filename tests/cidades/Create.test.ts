import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Create', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });

  it('Tenta criar um registro sem token de acesso', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'caxias do sul'
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('erros.default');
  });


  it('Criar registro', async () => {
    const res1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: 'caxias do sul'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });


  it('Tenta criar um registro com nome muito curto', async () => {
    const res1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: 'ca'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });


}); 