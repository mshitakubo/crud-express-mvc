const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt')
const {validationResult, body} = require ('express-validator')


module.exports = {
    cadastro: function (req, res) {
        res.render('./usuario/cadastro', { nome: undefined })
    },
    guardar: function (req, res) {
        let { nome, email, senha } = req.body
        let json_usuarios = fs.readFileSync(path.join('data', 'usuarios.json'), { encoding: 'utf-8' })
        json_usuarios = JSON.parse(json_usuarios)

        let senhaCript = bcrypt.hashSync(senha, 10)

        json_usuarios.push({
            nome: nome,
            email: email,
            senha: senhaCript
        })

        json_usuarios = JSON.stringify(json_usuarios)
        fs.writeFileSync(path.join('data', 'usuarios.json'), json_usuarios)
        res.render('./index', { title: '@' + nome, welcome: 'Seja bem-vindo ao Crud Express!' })
    },
    login: function (req, res) {
        res.render('./usuario/login')
    },
    validaLogin: function (req, res) {
        let errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.render('login',{errors :errors.errors})
        }

        let { email, senha } = req.body
        let usuarioSalvo = fs.readFileSync(path.join('data', 'usuarios.json'), { encoding: 'utf-8' })
        usuarioSalvo = JSON.parse(usuarioSalvo)

        let usuario = usuarioSalvo.find((usuario) => {
            return usuario.email == email
        })

        if (usuario == null) {
            res.send('Usuario não encontrado')
        }
        if (!bcrypt.compareSync(req.body.password, usuario.senha)) {
            return res.send('Senha inválida')
        }
        //Recebendo os dados da session
        req.session.usuario = usuario

        res.render('./index', { title: '@' + usuario.nome, welcome: 'Seja bem-vindo de volta ao Crud Express!' })

    }
}