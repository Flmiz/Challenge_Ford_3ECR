async function cadastrarCliente() {
    let nome = document.querySelector('#nome')
    let sobrenome = document.querySelector('#sobrenome')
    let email = document.querySelector('#cadastro-email')
    let senha = document.querySelector('#cadastro-senha')

    const dados = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        senha: senha.value
    };

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    };

    fetch("http://localhost:8080/cadastro", config)
        .then((response) => response.json())
        .then((dados) => {
            console.log("Success:", dados)
            if (dados.affectedRows === 0) {
                alert("Cliente já existe")
                email.style.borderColor = "red";
                email.style.boxShadow = "0px 0px 4px red";
            }
            else {
                email.style.borderColor = "#939393";
                email.style.boxShadow = "none";
            }
        })
        .catch((error) => {
            console.error("Error:", error)
      })
}

async function verificarCliente() {
    let email = document.querySelector('#login-email')
    let senha = document.querySelector('#login-senha')

    const dados = {
        email: email.value,
        senha: senha.value
    };

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    };

    fetch("http://localhost:8080/validacao", config)
        .then((response) => response.json())
        .then((dados) => {
            console.log("Success:", dados)
            if (!dados.email) {
                alert("Email ou senha inválidos")
                email.style.borderColor = "red";
                email.style.boxShadow = "0px 0px 4px red";
                senha.style.borderColor = "red";
                senha.style.boxShadow = "0px 0px 4px red";
            }
            else {
                email.style.borderColor = "#939393";
                email.style.boxShadow = "none";
                senha.style.borderColor = "#939393";
                senha.style.boxShadow = "none";

                const credenciais = new Map(Object.entries(dados))
                for (const [key, value] of credenciais) {
                    sessionStorage.setItem(key, value)
                }
                location.href = "metodo_de_pagamento.html"
            }
        })
        .catch((error) => {
            console.error("Error:", error)
      })
}

async function finalizarCompra() {
    const dados = {
        email: sessionStorage.getItem("email")
    }

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    }

    await fetch("http://localhost:8080/compra", config)
        .then((response) => response.json())
        .then((dados) => {
            console.log("Success:", dados)
            if (dados.affectedRows === 1) location.href = "pagamento_confirmado.html";
        })
        .catch((error) => {
            console.error("Error:", error)
      })
}

if (location.href.split("/").at(-1) !== "usuarios.html" && !sessionStorage.getItem("email")) {
    location.href = "usuarios.html"
}
