import express from "express";
import autenticar from "./secure/auten.js";
import session from "express-session";

const porta = 3000;
const localhost = "0.0.0.0"; // Disponível para todos os dispositivos (Domínio)
const app = express();

app.use(express.urlencoded({extended: true})); // true para biblioteca QS / false para biblioteca QueryString
 
app.use(session({
    // Para fins acadêmicos
    secret: "Dk24DFE23vFE3gCFF434Se2Cr42DEX",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10 // Minutos maximos de sessão
    }
}));

// Oferecer um recurso de login
app.get("/login", (req, resp) => {
    resp.redirect("/login.html");
});

app.post("/login", (req, resp) => {
    const user = req.body.nameValid;
    const pass = req.body.passValid;
    if(user == "Admin" && pass == "Admin"){
        req.session.autenticado = true;
        resp.redirect("/index.html");
    } else{
        resp.redirect("/login.html");
    }
});

app.get("/logout", (req, resp) => {
    req.session.autenticado = false
    resp.redirect("/index.html")
});

// HTTP é um protocolo stateless (não estabelece uma sessão)
// Prepara o servidor para disponibilizar recursos
// Servidor não "lembra" do ator que solicitou (não identifica)
app.use(express.static("./public"));

// autenticar é um middleware
app.use(autenticar, express.static("./private"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`); // Host local e porta
});