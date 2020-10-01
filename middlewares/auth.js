// Validação de login através de session


function auth (req, res, next){

    console.log(req.url)
    if(typeof(req.session.usuario)!= "undefined"){
        return next()
    } else {
        return res.render('usuario/login')
    }
}

module.exports = auth