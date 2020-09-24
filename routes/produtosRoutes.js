var express = require('express');
var router = express.Router();
var ProdutoController = require('../controllers/ProdutoController')
let auth = require('../middlewares/auth')

router.get('/cadastro', auth, ProdutoController.cadastro);
router.post('/guardar', auth, ProdutoController.guardar);
router.get('/', auth, ProdutoController.listar);
router.get('/edit/:codigo', ProdutoController.viewAttForm);
router.put('/editar/:codigo', ProdutoController.editar);
router.get('/delete/:codigo', ProdutoController.deletar);
router.get('/saveDelete/:codigo', ProdutoController.saveDelete);


module.exports = router;