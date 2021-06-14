const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const qy = require("../config/db");

//Paso 2: Login
exports.postLogin = async(req, res) => {

    try{
        if(!req.body.usuario || !req.body.clave){
            throw new Error("No enviaste todos los datos");
        }

        //Paso 1: encuentro al usuario en la DB
        let query = "SELECT * FROM datos_login WHERE usuario = ?";
        let respuesta = await qy(query, [req.body.usuario]);
        console.log(respuesta);
        
        if (respuesta.length <= 0) {
            
            throw new Error("Ese usuario no existe");
        }        
                    
        //Paso 2: Verificar contraseña        
        if(!bcrypt.compareSync(req.body.clave, respuesta[0].clave)){
            throw new Error("Falló el login");
        }
        
        //login correcto
        //Paso 3: generar sesión
        const tokenData = {
            nombre: "Lucas",
            apellido: "Vuoso",
            user_id: 1,
        };
        
        const token = jwt.sign(tokenData, "Secret", {
            expiresIn: 60 * 60 * 24 //expira en 24hs.
        });
        
        query = "INSERT INTO login (usuario, clave) VALUE (?, ?)";
        respuesta = await qy(query, [req.body.usuario.toUpperCase(), req.body.clave]);
        console.log(token);
        res.render("../view/usuarioCorrecto.html");

    }
    catch(e){
        res.status(413).send({message: e.message});
    }
};