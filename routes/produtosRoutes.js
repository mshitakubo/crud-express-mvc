var express = require('express');
var router = express.Router();
const {check, validationResult, body} = require ('express-validator')

var ProdutoController = require('../controllers/ProdutoController')
let auth = require('../middlewares/auth')
let noRepeat = require('../middlewares/norepeat')

// auth,
router.get('/cadastro', ProdutoController.cadastro);
router.post('/guardar',[
    check('codigo').isLength({min:3}).withMessage('O código deve conter no mínimo três caracteres;'),
    check('nome').isLength({min:3}).withMessage('O nome deve conter no mínimo três caracteres;'),
    check('desc').isLength({min:10}).withMessage('A descrição deve conter no mínimo dez caracteres;'),
], noRepeat, ProdutoController.guardar);
router.get('/', ProdutoController.listar);
router.get('/edit/:codigo',auth, ProdutoController.viewAttForm);
router.put('/editar/:codigo', ProdutoController.editar);
router.get('/delete/:codigo',auth, ProdutoController.deletar);
router.get('/saveDelete/:codigo', ProdutoController.saveDelete);


module.exports = router;