const express = require("express");
const jwt = require("jsonwebtoken");
const unless = require("express-unless");

const app = express();

//Middleware del usuario corroborado
const auth = (req, res, next) => {
    try{
    //Este código se tiene q ejecutar en todo momento salvo en la registración y en el login
        //Comienza reconocimiento
        token = req.headers["authorization"];

        if (!token) {
            throw new Error("No estás logueado");
        }

        token = token.replace("Bearer ", "");
        
        jwt.verify(token, "Secret", (err, user) => {
            if (err) {
                throw new Error("Token inválido");                
            }            
        });

        next();
        
    }
    catch(e){
        res.status(413).send({message: e.message});
    }
}

//llamo al middleware para q juegue siempre en cada llamado
//y con el unless le especifico en cual no estar
auth.unless = unless;
app.use(auth.unless({
    path: [
        {url: "/", methods: ["GET"]},
        {url: "/registro", methods: ["GET", "POST"]},
        {url: "/login", methods: ["GET", "POST"]},
        
    ]
}));

