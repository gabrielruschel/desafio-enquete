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

Em outros ambientes Linux como Ubuntu e Debian, é possível realizar a instalação pelos gerenciadores de pacotes padrão, como descrito na [documentação oficial do MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Iniciando o serviço
Após a instalação, é necessário iniciar o serviço do Mongo DB, a partir do `systemctl`: 
```
systemctl start mongod
systemctl enable mongod
```
para sistemas como Ubuntu e Debian. No Arch Linux o procedimento é o mesmo porém com o nome do pacote mongodb.
