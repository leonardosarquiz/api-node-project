import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - Create', () => {

  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post('/cidades').send({ nome: 'teste' });
    cidadeId = resCidade.body;

  });

  it('Criar registro', async () => {
    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'leonardo sarquiz huge',
      email: 'leosarquizhugep@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });


  it('Cria 2 registro', async () => {
    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'pedro sarquiz huge',
      email: 'pedro@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('tenta cria email duplicado', async () => {
    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'junior sarquiz huge',
      email: 'junior@gmail.com',
      cidadeId
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });


  it('tenta cria email duplicado', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'junior sarquiz huge',
      email: 'junior@gmail.com',
      cidadeId
    });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');

  });


  it('Tenta criar um registro com nome completo muito curto', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'ju',
      email: 'juniorpedro@gmail.com',
      cidadeId
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nomeCompleto');


  });


  it('Tenta criar um registro sem o nome completo ', async () => {
    const res2 = await testServer.post('/pessoas').send({

      email: 'juniorpedro@gmail.com',
      cidadeId
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nomeCompleto');


  });



  it('Tenta criar um registro sem o email ', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'juninho',
      cidadeId
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.nomeCompleto');


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



  it('Tenta criar um registro sem cidade id ', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'juninhoaloha',
      email: 'juniorpedro@gmail.com',

    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.cidadeId');


  });


  it('Tenta criar um registro com cidade id inválido', async () => {
    const res2 = await testServer.post('/pessoas').send({
      nomeCompleto: 'juninhoaloha',
      email: 'juniorpedro@gmail.com',
      cidadeId: 'teste'

    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.cidadeId');


  });


  it('Tenta criar um registro sem nenhuma propriedade', async () => {
    const res2 = await testServer.post('/pessoas').send({});

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty('errors.body.cidadeId');
    expect(res2.body).toHaveProperty('errors.body.nomeCompleto');
    expect(res2.body).toHaveProperty('errors.body.email');


  });




});

