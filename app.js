const express = require("express");

const app = express();





const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/routes"));

app.engine('html', require('ejs').renderFile);


app.listen(port, () => {
    console.log("Servidor conectado en el puerto ", port);
});