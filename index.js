//DESAFIO REALIZADO POR TABATHA GAMBOA Y NICOLE GAMBOA 
const express = require("express");
require('dotenv').config()
const {engine} = require("express-handlebars");
const {getTodos, createTodos, deleteTodos} = require("./db")
const PORT = process.env.PORT || 3000

const app = express();
// configuracion handlebars
app.engine("hbs", engine({extname : ".hbs"}));
app.set("view engine", ".hbs");
app.set("views", "./views");

// midleware
app.use(express.urlencoded({extended : true}))
app.use(
    "/css/bootstrap.min.css1",
    express.static(
        __dirname + "/public/css/bootstrap.min.css"
    )
);

// PAGINA PRINCIPAR LISTADO DE TAREAS
app.get("/", async(req,res) => {
    const todos = await getTodos()
    res.render('getTodo', {todos});
})
// FORMULARIO PARA CREAR TAREA
app.get("/user-create", async(req,res) => {
    res.render("createTodo");
})

// 'FORMULARIO' PARA ELIMINAR TAREA
app.get("/user-delete/:id", async(req,res) => {
    const {id} = req.params
    res.render("deleteTodo", {id});
})


// JSON CON DATOS
app.get("/users", async (req,res) => {
    const todos = await getTodos()
    res.json(todos)
})
// CREATE
app.post("/users", async(req,res) => {
    const {name,description} = req.body
    const crear = await createTodos(name,description)
    res.render(process.env.CREATE_RENDER , {name, description})
})
// DELETE
app.get("/user/:id", async (req,res) => {
    const {id} = req.params
    const eliminar = await deleteTodos(id)
    res.render("eliminado" , {id})
})


app.listen(PORT,() => console.log("servidor andando 3000"))