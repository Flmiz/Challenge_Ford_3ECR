function formatarParcelas() {
    let parcelas = document.querySelector("#parcela");
    let preco = document.querySelector("#preco");

    if (parcelas) {
        for (var i = 1; i < 25; i++) {
            var precoParcela = parseFloat(preco.innerText.replace(".", "")) / i;
            var parcela = document.createElement("option");
            parcela.innerText =
                i === 1
                    ? `${i}x parcela de R$ ${precoParcela.toFixed(2)}`
                    : `${i}x parcelas de R$ ${precoParcela.toFixed(2)}`;
            parcelas.append(parcela);
            parcela.value = i;
        }
    }
}

function formatarRadio(ele) {
    ele.querySelector("input").checked = true;
}

function formatarNumeros(ele) {
    ele.value = ele.value.replace(/[^0-9.]/g, "");
}

formatarParcelas();
