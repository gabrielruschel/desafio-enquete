# desafio-enquete
Este projeto contém a implementação de uma API RESTful para o Desafio Enquete.

## Ferramentas Utilizadas
* NodeJS: 13.11.0
* npm: 6.14.2
* MongoDB: 4.2.3

Todas as dependências do Node utilizadas no projeto podem ser encontradas no `package.json`.

## Banco de Dados
O banco de dados escolhido para a aplicação foi o MongoDB (Community Edition). 

### Instalação
Como realizei todo o desenvolvimento no Arch Linux, para a instalação foi utilizado o pacote `mongodb-bin`, que no ambiente Arch pode ser instalado com um AUR helper ou clonando o repositório disponível no [repositório oficial](https://aur.archlinux.org/packages/mongodb-bin/) e instalar com a ferramenta `makepkg -si`.

Em outros ambientes Linux como Ubuntu e Debian, é possível realizar a instalação pelos gerenciadores de pacotes padrão (apt / apt-get), como descrito na [documentação oficial do MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Iniciando o serviço
Após a instalação, é necessário iniciar o serviço do Mongo DB, a partir do `systemctl`: 
```
systemctl start mongod
systemctl enable mongod
```
para sistemas como Ubuntu e Debian. No Arch Linux o procedimento é o mesmo porém com o nome do pacote mongodb.

## Aplicação
O projeto foi desenvolvido com NodeJS, portanto é necessário ter o `node` e o `npm` instalados. Após clonar o repositório, é necessário executar o comando `npm install` no diretório raiz do projeto, para instalar todas as dependências necessárias para a execução da aplicação.

### Configuração
Os arquivos de configuração da aplicação estão no diretório `config`. No diretório estão dois arquivos json:
* `dev.json`: Configuração para o ambiente de desenvolvimento/produção.
* `test.json`: Configuração para o ambiente de testes.

Ambos arquivos possuem três variáveis:

* ServerHost: ip no qual o server irá escutar.
* Port: Porta designada para a aplicação.
* DBHost: Endereço de conexão do banco de dados e base utilizada.

### Execução
Feita a configuração para os ambientes de produção e teste, para executar a aplicação basta executar no diretório raiz
```
npm start
```
Para executar os testes, basta executar no diretório raiz
```
npm test
```

## Código
O arquivo de execução do server é o `server.js` que se encontra no diretório raiz, os demais arquivos de código da aplicação se encontram sob o diretório `app`. Em `app/routes` está o arquivo que descreve as rotas utilizadas na API, em `app/models` está a definição do modelo para a interação com o banco de dados, e em `app/controllers` está o arquivo com a lógica das funções utilizadas em cada rota da API. No diretório `test` estão descritos os testes das rotas da API.
