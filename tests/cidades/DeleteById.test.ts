import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {


  let accessToken = '';

  beforeAll(async () => {
    const email = 'delete-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '1234567' });
    const signInRes = await testServer.post('/entrar').set({ email, senha: '1234567' });

    accessToken = signInRes.body.accessToken;
  });

  it('Apaga registro', async () => {
    const res1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: 'caxias do sul'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagada = await testServer
      .delete(`/cidades/${res1.body}`)
      .send();

    expect(resApagada.status).toEqual(StatusCodes.NO_CONTENT);
  });


  it('Tenta apagar registro que não existe', async () => {

    const res1 = await testServer
      .delete('/cidades/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


}); 