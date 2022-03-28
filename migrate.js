require('dotenv').config()
const fs = require('fs')
const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:10011@localhost:5433/hero_db'

// const pool = new Pool({
//     connectionString,
//     ssl :{rejectUnauthorized:false}
// })

const migrate = async () => {
    const client = new Client({
        connectionString,
        ssl: {rejectUnauthorized: false},})
    
    await client.connect()

    const sql = fs.readFileSync('data.sql').toString();

    const res = await client.query(sql)
    await client.end()
    return res.rows
}

migrate().then(console.log)