// DESAFIO REALIZADO POR TABATHA GAMBOA Y NICOLE GAMBOA 

require('dotenv').config()

const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:10011@localhost:5433/hero_db'




const getTodos = async () => {
    const client = new Client({connectionString, ssl: {rejectUnauthorized: false},})
    await client.connect()
    try{
        const res = await client.query('SELECT * from tablaH')
        return res.rows
    }catch(error){
        console.log("error en DB :" + error)
        return {data:"error"}
    }finally{
        
    await client.end()
    }
}


const createTodos = async (name,description) => {
    const client = new Client({connectionString, ssl: {rejectUnauthorized: false},})
    await client.connect()
    const query = { 
        text: "INSERT INTO tablaH (nombre, descripcion, fechacreacion) VALUES($1,$2,now()) RETURNING*;",
        values:[name,description]
    }
    try{
        const res = await client.query(query)
        return res.rows
    }catch(error){
        console.log("error en DB :" + error)
        return {data:"error"}
    }finally{
        
    await client.end()
    }
}

const deleteTodos = async (id) => {
    const client = new Client({connectionString, ssl: {rejectUnauthorized: false},})
    await client.connect()
    const query = { 
        text: "DELETE from tablaH WHERE id = $1 RETURNING*;",
        values:[id]
    }
    try{
        const res = await client.query(query)
        return res.rows
    }catch(error){
        console.log("error en DB :" + error)
        return {data:"error"}
    }finally{
        
    await client.end()
    }
}



module.exports = {getTodos , createTodos, deleteTodos}




