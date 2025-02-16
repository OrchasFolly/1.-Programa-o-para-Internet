import express from "express";
import autenticar from "./secure/auten.js";

const porta = 3000;
const localhost = "0.0.0.0"; // Disponível para todos os dispositivos (Domínio)
const app = express();

// HTTP é um protocolo stateless (não estabelece uma sessão)
// Prepara o servidor para disponibilizar recursos
// Servidor não "lembra" do ator que solicitou (não identifica)
app.use(express.static("./public"));

// autenticar é um middleware
app.use(autenticar, express.static("./private"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`); // Host local e porta
});