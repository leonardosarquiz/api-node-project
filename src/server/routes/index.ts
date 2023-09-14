import { Router } from 'express';
import { CidadesController, PessoasControler, UsuariosControler } from './../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteValidation, CidadesController.deleteById);


router.get('/pessoas', ensureAuthenticated, PessoasControler.getAllValidation, PessoasControler.getAll);
router.post('/pessoas', ensureAuthenticated, PessoasControler.createValidation, PessoasControler.create);
router.get('/pessoas/:id', ensureAuthenticated, PessoasControler.getByIdValidation, PessoasControler.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasControler.updateByIdValidation, PessoasControler.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasControler.deleteValidation, PessoasControler.deleteById);



router.post('/entrar', UsuariosControler.signInValidation, UsuariosControler.signIn);
router.post('/cadastrar', UsuariosControler.signUpValidation, UsuariosControler.signUp);


export { router };