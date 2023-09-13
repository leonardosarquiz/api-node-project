import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SignUp', () => {


  it('Cadastra usuário', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      nome: 'Leonardo',
      email: 'leohuges@gmail.com',
      senha: '12345678'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });


  it('Cria usuário 2', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joaopedroteste@gmail.com',
      senha: 'jp1020tta'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Erro ao cadastar usuário com email duplicado', async () => {
    const res1 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joaopedroteste@gmail.com',
      senha: 'jp1020tta'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joaopedroteste@gmail.com',
      senha: 'jp1020tta'
    });


    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');



  });


  it('Erro ao cadastrar usuario sem email', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      senha: 'jp1020tta'
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.email');

  });


  it('Tenta criar um usuário sem nome', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      email: 'joaopedroteste@gmail.com',
      senha: 'jp1020tta'
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nome');


  });


  it('Tenta criar um usuário sem senha ', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joaopedroteste@gmail.com',

    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.senha');


  });



  it('Tenta criar um usuário com email inválido ', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joa',
      senha: 'jp1020tta'
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.email');


  });


  it('Tenta criar um registro com o email inválido ', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'juninhopedi',
      email: 'junior pedro@gmail. com',
      cidadeId
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.email');


  });



  it('Tenta criar um usuário com a senha muito pequena', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'joão pedro',
      email: 'joaopedroteste@gmail.com',
      senha: 'ab'

    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.senha');


  });


  it('Tenta criar um usuário com o nome muito pequeno', async () => {
    const res2 = await testServer.post('/cadastrar').send({
      nome: 'jo',
      email: 'joaopedroteste@gmail.com',
      senha: 'abcdefghi'

    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nome');


  });



});

