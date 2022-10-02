let metodo = document.querySelector("#pagamento")
let seletor = document.querySelectorAll(".payment-card")

function definirMetodo() {
    seletor.forEach(item => {
        item.style.display = "none"
    })

    if (metodo.value === "credito" || metodo.value === "debito") {
        document.querySelector("#cartao").style.display = "inline-block"
        if (metodo.value === "credito") {
            document.querySelector("#parcelas").style.display = "block"
        }
        else {
            document.querySelector("#parcelas").style.display = "none"
        }
    }
}

definirMetodo()