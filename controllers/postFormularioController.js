const qy = require("../config/db");

exports.postFormulario = async(req, res) => {

    try {
        
        query = "SELECT * FROM registro WHERE email = ?";
        respuesta = await qy(query, [req.body.email]);

        if (respuesta.length > 0) {
            res.send(`<html><head><title>Mensaje de error</title><link rel="stylesheet" href="./validacionEmail.css"></head><body><h1>Hola ${req.body.nombre} ${req.body.apellido}! </h1><br/>
            <p> El email que ingresaste (${req.body.email}) ya existe en nuestra base de datos, por favor ingresá uno diferente.<br>Disculpá las molestias</p>
            <button><a href='/'>Volver a completar el formulario</a></button></body><html>`);
            throw new Error("");
        }

        let comentario = "";
        if (req.body.comentario) {
            comentario = req.body.comentario;
        }

        query = "INSERT INTO registro (nombre, apellido, edad, celular, email, lugar_nacimiento, lugar_residencia, comentario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        respuesta = await qy(query, [req.body.nombre, req.body.apellido, req.body.edad, req.body.celular, req.body.email, req.body.lugar_nacimiento, req.body.lugar_residencia, comentario]);

        res.send(`<html><head><title>Formulario de registracion</title><link rel="stylesheet" href="./validacionEmail.css"></head><body><h1>Hola ${req.body.nombre} ${req.body.apellido}! </h1><br/>
        <p> Nos dijiste que tienes una edad de ${req.body.edad} años, tu número de celular es ${req.body.celular} y tu email es ${req.body.email}.<br>
        Usted nació en ${req.body.lugar_nacimiento} y actualmente vive en ${req.body.lugar_residencia}.<br>
        Por último, el comentario que escribió para que tengamos en cuenta es: ${req.body.comentario}.</p><br>
        <button><a href='/'>Volver a completar el formulario</a></button></body><html>`);

    } catch (error) {

        console.error(error.message);
        res.status(413).send({ "Error": error.message });

    }

};