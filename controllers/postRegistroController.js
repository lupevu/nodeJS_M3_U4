const bcrypt = require("bcrypt");

const qy = require("../config/db");

//Autenticación
//Paso 1: registración
exports.postRegistro = async(req, res) => {

    try{
        if (!req.body.usuario || !req.body.clave || !req.body.email) {
            throw new Error("No enviaste todos los datos requeridos");
        }

        //verifico que el usuario no haya sido utilizo
        let query = "SELECT * FROM datos_login WHERE usuario = ?";
        let respuesta = await qy(query, [req.body.usuario]);
        
        if (respuesta.length > 0) {
            throw new Error("Ese usuario ya existe");
        }

        //verifico que el email no haya sido utilizo
        query = "SELECT * FROM datos_login WHERE email = ?";
        respuesta = await qy(query, [req.body.email]);
        
        if (respuesta.length > 0) {
            throw new Error("Ese email ya existe");
        }
        
        //Si está todo ok, encripto la clave
        const claveEncriptada = await bcrypt.hash(req.body.clave, 10);
                        
        //guardo el nuevo usuario
        query = "INSERT INTO datos_login (usuario, clave, email) VALUE (?, ?, ?)";
        respuesta = await qy(query, [req.body.usuario.toUpperCase(), claveEncriptada, req.body.email.toUpperCase()]);
        res.render("../view/registroCorrecto.html");

    }
    catch(e){
        res.status(413).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulario de admisión</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
            <link rel="stylesheet" href="./style.css">            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link" href="/lista">Lista de registros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/formulario">Forumalario de admisión</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/registro">Registro usuario</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                    </ul>    
                </div>
            </div>
        </nav>
        <p>${message = e.message}</p>
        <button class="btn"><a href="/registro">Volver</a></button>
        </body></html>
        `);            
    }
};