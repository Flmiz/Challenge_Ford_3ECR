let meses = document.querySelector("#month");
let anos = document.querySelector("#year");
let main = document.querySelector("#payment-card");

let anoAtual = new Date().getFullYear();

for (var i = 1; i < 13; i++) {
    var mes = document.createElement("option");
    mes.innerText = i < 10 ? "0" + i : i;
    meses.append(mes);
}

for (var i = anoAtual; i < anoAtual + 11; i++) {
    var ano = document.createElement("option");
    ano.innerText = i;
    anos.append(ano);
}
