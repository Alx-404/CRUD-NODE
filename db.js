const pg = require('pg');

const client = new pg.Client({
    user:'postgres',
    host:'localhost',
    database:'crud',
    password:'12345',
    port:5432 
})

async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:12345@localhost:5432/crud'
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}



async function listEmployes(){
    //await client.connect() CONEXAO DIRETA 
    pool=await connect();
    const res = await pool.query('SELECT * FROM employees')
    return res.rows 
}

async function addEmployes(emp){
   const pool=await connect();
   const sql = 'INSERT INTO employees(name,function,wage) VALUES($1,$2,$3);';
   const values = [emp.name,emp.function,emp.wage];
   await pool.query(sql,values);

}

async function deleteEmployes(id){
    const pool = await connect();
    const sql = 'DELETE FROM employees where cod_emp=$1;';
    return await pool.query(sql, [id]);
}



module.exports = {listEmployes,addEmployes,deleteEmployes}
