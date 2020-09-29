const path = require('path');
const fs = require('fs');

function noRepeat (req, res, next){
    let {codigo} = req.body
        
        let jsonProdutos = fs.readFileSync(path.join('data', 'produtos.json'))
        jsonProdutos = JSON.parse(jsonProdutos)
        
        jsonProdutos.forEach(function (value, indice) {
            if (indice.codigo == codigo) {
                var resultado = true
            }
               
        if(codigo){
                return res.render('./produtos/cadastro', { codigo: codigo })
            }else {
                next()
            }
        })
}

module.exports = noRepeat