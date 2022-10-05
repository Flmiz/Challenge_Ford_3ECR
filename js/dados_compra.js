function varificarDados() {
    let metodo = document.querySelector("#pagamento");
    let dados = new Map();

    if (metodo) {
        if (metodo.value === "credito" || metodo.value === "debito") {
            let nome = document.querySelector("#nome");
            let cpf = document.querySelector("#cpf");
            let cartao = document.querySelector("#numero-cartao");
            let codigoSeguranca = document.querySelector("#codigo-seguranca");
            let month = document.querySelector("#month");
            let year = document.querySelector("#year");
            let parcela = document.querySelector("#parcela");
            console.log(year.maxLength);

            verificarCartao(cartao.value);

            dados.set("nome", nome);
            dados.set("cpf", cpf);
            dados.set("cartao", cartao);
            dados.set("codigo_seguranca", codigoSeguranca);
            dados.set("mes", month);
            dados.set("ano", year);
            if (metodo.value === "credito") {
                dados.set("parcelas", parcela);
            }

            var valido = true;

            dados.forEach((key) => {
                if (
                    key.value === "" ||
                    (key.maxLength !== undefined &&
                        key.maxLength !== -1 &&
                        key.value.length !== key.maxLength)
                ) {
                    key.style.border = "2px solid red";
                    key.style.boxShadow = "0px 0px 4px red";
                    valido = false;
                } else {
                    key.style.border = "2px solid var(--cor-primaria)";
                    key.style.boxShadow = "none";
                }
            });

            if (!valido) {
                alert("Campos preenchidos incorretamente.");
            } else {
                for (const [key, value] of dados) {
                    dados.set(key, value.value);
                }
                dados.set("tipo", metodo.value);

                salvarDados(dados);
            }
        }
    }
}

function verificarCartao(numero) {
    if (numero.length !== 16) {
    }
}

function salvarDados(dados) {
    for (const [key, value] of dados) {
        sessionStorage.setItem(key, value);
    }
    location.href = "revisar_pagamento.html";
}

function excluirDados() {
    sessionStorage.removeItem("dados_compra");
    sessionStorage.clear();
}

function recuperarDados() {
    let dadosCliente = document.querySelector("#dados-cliente");
    if (dadosCliente) {
        let nome = document.createElement("p");
        nome.innerText = sessionStorage.getItem("nome");
        let email = document.createElement("p");
        email.innerText = sessionStorage.getItem("email");

        dadosCliente.append(nome);
        dadosCliente.append(email);
    }

    let dadosPagamento = document.querySelector("#dados-pagamento");
    if (dadosPagamento) {
        let tipo = sessionStorage.getItem("tipo");
        if (tipo === "credito" || tipo === "debito") {
            var cartao = sessionStorage.getItem("cartao");
            var dataExpiracao = sessionStorage.getItem("mes") + "/";
            dataExpiracao += sessionStorage.getItem("ano");

            let textoCartao = document.createElement("p");
            textoCartao.innerText = "Ultimos digitos do cartão: " + cartao.slice(-4);
            let textoExpiracao = document.createElement("p");
            textoExpiracao.innerText = "Data de expiração: " + dataExpiracao;

            dadosPagamento.append(textoCartao);
            dadosPagamento.append(textoExpiracao);

            if (tipo === "credito") {
                let br = document.createElement("br");
                var parcelas = parseInt(sessionStorage.getItem("parcelas"));
                var precoParcela =
                    parseFloat(preco.innerText.replace(".", "")) / parcelas;
                let textoParcelas = document.createElement("p");
                textoParcelas.innerText =
                    parcelas === 1
                        ? `À vista de R$ ${precoParcela.toFixed(2)}`
                        : `${parcelas}x parcelas de R$ ${precoParcela.toFixed(2)}`;
                dadosPagamento.append(br);
                dadosPagamento.append(textoParcelas);
            }
        }

        let div = document.createElement("div");
        div.classList.add("borda-superior");
        let retornar = document.createElement("a");
        retornar.innerText = "Mudar forma de pagamento";
        retornar.href = "metodo_de_pagamento.html";
        retornar.classList.add("mudar-pagamento");

        div.append(retornar);
        dadosPagamento.append(div);
    }
}

function confirmarCompra() {
    let radioDiv = document.querySelector("#entrega");
    if (radioDiv) {
        let radio = radioDiv.querySelectorAll("input");
        var valido = false;
        radio.forEach((input) => {
            if (input.checked) {
                sessionStorage.setItem("entrega", input);
                valido = true;
            }
        });
    }
    if (valido) {
        postarDados();
    } else {
        alert("Selecione um método de entrega válido");
    }
}

function postarDados() {
    finalizarCompra();
}

recuperarDados();
