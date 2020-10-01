const path = require('path');
const fs = require('fs');
const {check, validationResult, body} = require ('express-validator')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('produtos', 'root', 'Entrada.1234',{
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!')
}).catch(function(erro){
    console.log('Falha ao se conectar: '+ erro)
})

module.exports = {
    cadastro: function(req, res){
        res.render('./produtos/cadastro')
    },
    guardar: function (req, res) {
        let listaDeErrors = validationResult(req)

        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'))
        jsonProdutos = JSON.parse(jsonProdutos)


        if (listaDeErrors.isEmpty()) {
            jsonProdutos.push({
                nome: req.body.nome.toUpperCase(),
                codigo: req.body.codigo.toUpperCase(),
                descricao: req.body.desc.toUpperCase(),
                ativo: req.body.status
            })

            jsonProdutos = JSON.stringify(jsonProdutos)

            fs.writeFileSync(path.join('data', 'produtos.json'), jsonProdutos)
            res.render('./produtos/cadastro', { nome: req.body.nome })

        } else {
            res.render('./produtos/cadastro', { errors: listaDeErrors.errors })
        }
    },
    listar: function(req, res) {
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'),{encoding:'utf-8'})
        jsonProdutos = JSON.parse(jsonProdutos)
        res.render('./produtos/listar', {data: jsonProdutos, usuario: req.session.usuario})
    },
    viewAttForm: function(req, res){
        let {codigo} = req.params
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'),{encoding:'utf-8'})
        jsonProdutos = JSON.parse(jsonProdutos)
        
        jsonProdutos.forEach(function(value, indice){
            if(value.codigo == codigo){
                res.render('./produtos/editarProduto',{
                    codigo: value.codigo, 
                    nome: value.nome, 
                    descricao: value.descricao,
                    ativo: value.ativo
                })
            }
        })
    },
    editar: function(req, res){
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'),{encoding:'utf-8'})
        jsonProdutos = JSON.parse(jsonProdutos)
        
        let {codigo} = req.params
        let {nome, descricao, status} = req.body
        
        console.log('teste: '  + codigo)

        jsonProdutos.forEach(function(value, indice){
            if(value.codigo == codigo){
                console.log('passei aqui')
                value.nome = nome;
                value.descricao = descricao;
                value.ativo = status;
            }
        })
        jsonProdutos = JSON.stringify(jsonProdutos)
        fs.writeFileSync(path.join('data','produtos.json'),jsonProdutos)

        jsonProdutos = JSON.parse(jsonProdutos)
        res.render('./produtos/listar', {data: jsonProdutos})
    },
    deletar: function(req, res){
        let {codigo} = req.params
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'),{encoding:'utf-8'})
        jsonProdutos = JSON.parse(jsonProdutos)
        let nome = null
        let cod = null

        jsonProdutos.forEach(function(value, indice){
            if(value.codigo == codigo){
                nome = value.nome
                cod = value.codigo
            }
        })
        res.render('./produtos/saveDelete',{ nome: nome, codigo: cod})
    },
    saveDelete: function(req, res){
        let {codigo} = req.params
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'),{encoding:'utf-8'})
        jsonProdutos = JSON.parse(jsonProdutos)

        let newJson = jsonProdutos.filter(produto => produto.codigo != codigo)
        jsonProdutos = JSON.stringify(newJson)
        
        fs.writeFileSync(path.join('data','produtos.json'),jsonProdutos)
        jsonProdutos = JSON.parse(jsonProdutos)

        res.render('./produtos/listar', {data: jsonProdutos})
    }
}

