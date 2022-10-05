### Executar os seguintes comandos dentro do diretório node
npm i --save express <br />
npm i --save cors <br />
npm i --save mysql2 <br />
npm i --save nodemailer <br />
<br />
node ./main.js <br />

### Executar os seguintes comando no mysql
CREATE USER 'nodejs'@'localhost' IDENTIFIED BY 'ford'; <br />
GRANT ALL PRIVILEGES ON * . * TO 'nodejs'@'localhost'; <br />
FLUSH PRIVILEGES; <br />
<br />
CREATE DATABASE ford; <br />
USE ford;<br />
<br />
CREATE TABLE `clientes` ( <br />
  `cliente_id` int NOT NULL AUTO_INCREMENT, <br />
  `nome` varchar(25) NOT NULL, <br />
  `sobrenome` varchar(25) NOT NULL, <br />
  `email` varchar(50) DEFAULT NULL, <br />
  `senha` varchar(20) NOT NULL, <br />
  PRIMARY KEY (`cliente_id`), <br />
  UNIQUE KEY `email` (`email`) <br />
); <br />
<br />
  CREATE TABLE `vendas` ( <br />
  `venda_id` int NOT NULL AUTO_INCREMENT, <br />
  `cliente_id` int DEFAULT NULL, <br />
  `carro_id` int DEFAULT NULL, <br />
  `data_compra` date DEFAULT NULL, <br />
  `metodo_pagamento` varchar(20) DEFAULT NULL, <br />
  `parcelas` int DEFAULT NULL, <br />
  PRIMARY KEY (`venda_id`) <br />
); <br />
<br />

