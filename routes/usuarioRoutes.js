var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/UsuarioController')

router.get('/cadastro', UsuarioController.cadastro);
router.post('/guardar', UsuarioController.guardar);
router.get('/login', UsuarioController.login);
router.post('/validaLogin', UsuarioController.validaLogin);


module.exports = router;