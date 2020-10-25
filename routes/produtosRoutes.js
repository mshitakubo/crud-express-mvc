
var express = require('express');
var router = express.Router();
const {check, validationResult, body} = require ('express-validator')


var ProdutoController = require('../controllers/ProdutoController')
let auth = require('../middlewares/auth')
let noRepeat = require('../middlewares/norepeat')

// auth,
router.get('/cadastro',ProdutoController.cadastro);

/**
 * @swagger
 * /produto/guardar:
 *  post:
 *      tags:
 *         - Produtos
 *      description: Cadastro de produtos.
 *      responses:
 *          '200':
 *              description: Produto cadastrado com sucesso!
 *          '400':
 *              description: Erro no envio das informações
 */
router.post('/guardar',[
    check('codigo').isLength({min:3}).withMessage('O código deve conter no mínimo três caracteres;'),
    check('nome').isLength({min:3}).withMessage('O nome deve conter no mínimo três caracteres;'),
    check('desc').isLength({min:10}).withMessage('A descrição deve conter no mínimo dez caracteres;'),
], noRepeat, ProdutoController.guardar);


router.get('/cadastro',ProdutoController.cadastro);

/**
 * @swagger
 * /produto/:
 *  get:
 *      tags:
 *         - Produtos
 *      description: Lista todos o produtos cadastrados na aplicaçao
 *      responses:
 *          '200':
 *              description: Produto cadastrado com sucesso!
 */
router.get('/', ProdutoController.listar);


router.get('/edit/:codigo',auth, ProdutoController.viewAttForm);

/**
 * @swagger
 * /produto/edit/{codigo} :
 *  put:
 *      tags:
 *         - Produtos
 *      description: Edição de produtos
 *      parameters:
 *         - name: id
 *           description: id to get by
 *           in: path
 *           type: integer
 *           required: true
 *      responses:
 *           '200':
 *               description: Sucesso na resposta!
 */
router.put('/editar/:codigo', ProdutoController.editar);

router.get('/delete/:codigo',auth, ProdutoController.deletar);

/**
 * @swagger
 * /produto/saveDelete/{codigo} :
 *  delete:
 *      tags:
 *         - Produtos
 *      description: Excluir produtos!
 *      parameters:
 *         - name: id
 *           description: id to get by
 *           in: path
 *           type: integer
 *           required: true
 *      responses:
 *           '200':
 *               description: Sucesso na resposta!
 */
router.delete('/saveDelete/:codigo', ProdutoController.saveDelete);


module.exports = router;