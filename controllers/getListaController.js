const qy = require("../config/db");

exports.getLista = async(req, res) => {

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
                        <a href="/formulario">Volver</a>                        
                    </button>
                </div>
                </body></html>`);

    } catch (error) {

        console.error(error.message);
        res.status(413).send({ "Error": error.message });

    }

};


