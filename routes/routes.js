const express = require('express');
const router = express.Router();

//Importamos los controladores
const homeController = require("../controllers/homeController");
const getListaController = require("../controllers/getListaController");
const getFormularioController = require("../controllers/getFormularioController");
const postFormularioController = require("../controllers/postFormularioController");
const getRegistroController = require("../controllers/getRegistroController");
const postRegistroController = require("../controllers/postRegistroController");
const getRegistroCorrectoController = require("../controllers/getRegistroCorrectoController");
const getLoginController = require("../controllers/getLoginController");
const postLoginController = require("../controllers/postLoginController");
const getUsuarioController = require("../controllers/getUsuarioController");

//Ruta para el home
router.get("/", homeController.getHome);

//Ruta para el listado
router.get("/lista", getListaController.getLista);

//Ruta para el formulario
router.get("/formulario", getFormularioController.getFormulario);
router.post("/formulario", postFormularioController.postFormulario);

//Ruta para el registro
router.get("/registro", getRegistroController.getRegistro);
router.post("/registro", postRegistroController.postRegistro);
router.get("/registroCorrecto", getRegistroCorrectoController.getRegistroCorrecto);

//Rutas para el login
router.get("/login", getLoginController.getLogin);
router.post("/login", postLoginController.postLogin);
router.get("/usuario", getUsuarioController.getUsuario);

module.exports = router;