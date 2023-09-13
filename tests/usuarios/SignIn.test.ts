import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SignIn', () => {

  beforeAll(async () => {
    await testServer.post('/cadastrar').setEncoding({
      nome: 'jorge',
      email: 'jorgeteste@gmail.com',
      senha: '1234rfedaw',
    });
  });


  it('faz login', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgeteste@gmail.com',
      senha: '1234rfedaw',
    });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty('accessToken');
  });


  it('Senha errada', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgeteste@gmail.com',
      senha: '1234rfed',
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Email errado', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgetestttte@gmail.com',
      senha: '1234rfed'
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');


  });


  it('Email formato errado', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgetestttte gmail.com',
      senha: '1234rfed'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });


  it('Senha muito curta', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgetestttte gmail.com',
      senha: '12'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');


  });


  it('Senha não informada ', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgetestttte gmail.com',
      //senha: '12'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.senha');


  });



  it('email não informado ', async () => {
    const res1 = await testServer.post('/entrar').send({
      email: 'jorgetestttte gmail.com',
      senha: '12'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');

  });




});

