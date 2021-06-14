

exports.getHome = (req, res) => {

    res.render("../view/home.html", {nombrePagina: "Home page",});

}