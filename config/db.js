const mysql = require("mysql");
const util = require("util");

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

module.exports = qy;