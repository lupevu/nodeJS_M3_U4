const express = require("express");
const mysql = require("mysql");
const util = require("util");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexión con la BD
const conexion = mysql.createConnection({
    host: "freedb.tech",    
    user: "freedbtech_lupevu",
    password: "utndiplomatura",
    port: 3306,
    database: "freedbtech_tpRegistrosUtn",
})

//Conexión con su callback de error
conexion.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("Conexión con la base de datos MySQL establecida");
});

//Utilidad async-await en la conexión MySQL
const qy = util.promisify(conexion.query).bind(conexion);

app.get("/lista", async(req, res) => {

    try {

        const query = "SELECT * FROM registro";
        const respuesta = await qy(query, [req.params.id]);
        console.table(respuesta);

        let lista = "";
        for (let i = 0; i < respuesta.length; i++) {

            lista += `           
                <tr>
                    <td>${respuesta[i].id}</td><td>${respuesta[i].nombre}</td><td>${respuesta[i].apellido}</td><td>${respuesta[i].edad}</td><td>${respuesta[i].celular}</td>
                    <td>${respuesta[i].email}</td><td>${respuesta[i].lugar_nacimiento}</td><td>${respuesta[i].lugar_residencia}</td><td>${respuesta[i].comentario}</td>
                    
                </tr>
            `
        }

        res.send(`<html><head><title>Lista de registros</title><link rel="stylesheet" href="lista.css"></head>
                <body>
                <div class="animate__animated animate__flipInY">
                    <table>
                        <h1>Lista de registros</h1>
                        <tr>
                            <th>Id</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Celular</th><th>Email</th>
                            <th>Lugar nacimiento</th><th>Lugar residencia</th><th>Comentario</th>                          
                        </tr>
                        ${lista}
                    </table>                    
                    <button class="btn">
                        <a href="index.html">Volver</a>                        
                    </button>
                </div>
                </body></html>`);

    } catch (error) {

        console.error(error.message);
        res.status(413).send({ "Error": error.message });

    }

});

app.post("/", async(req, res) => {

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

});

app.listen(port, () => {
    console.log("Servidor conectado en el puerto ", port);
});