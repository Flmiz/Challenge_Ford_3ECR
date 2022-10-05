import * as mysql from 'mysql2'
import send from './email_handler.mjs';

const database = mysql.createConnection({
    host: "localhost",
    user: "nodejs",
    password: "ford",
    database: "ford" 
});

function autenticarCliente(credenciais, callback) {
    let sql = `select nome, sobrenome, email, senha from clientes where email = "${credenciais.email}";`

    database.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
        database.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (!result[0]) {
            callback(result)
            return
        }
        if (result[0].senha === credenciais.senha) {
            callback(result[0])
        }
        })
    })
}

function finalizarCompra(credenciais, callback) {
    let sql = `insert into vendas 
    (cliente_id, carro_id, data_compra, metodo_pagamento, parcelas)
    select cliente_id, 1, now(), "debito", 12
    from clientes
    where email = "${credenciais.email}";`

    database.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
        database.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.affectedRows === 0) {
            callback(result)
        }
        send(credenciais.email)
        callback(result)
        })
    })
}

function cadastrarCliente(credenciais, callback) {
    let sql = `insert into clientes (nome, sobrenome, email, senha)
    select "${credenciais.nome}", "${credenciais.sobrenome}", "${credenciais.email}", "${credenciais.senha}"
    from clientes
    where not exists (
        select *
        from clientes
        where email = "${credenciais.email}"
    )
    limit 1;`

    database.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
        database.query(sql, function (err, result, fields) {
        if (err) throw err
        callback(result)
        })
    })
}
    
export {autenticarCliente, finalizarCompra, cadastrarCliente}