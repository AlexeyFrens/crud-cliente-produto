
# Sistema de Gerenciamento - Ecommerce (Front-end)

Front-end de um Painel Administrativo para gerenciar clientes e produtos de um Ecommerce.

## Pré Requisitos

**Backend Ativo:** A API backend **deve** estar em execução. O frontend está configurado para 
buscar a API em ``http://localhost:8080``.

**Servidor Web:** Você precisa servir os arquivos do frontend usando um servidor web (pode ser 
local, como o "Live Server" por exemplo).

## Interação com a API
O front-end consome os endpoints do back-end. Toda a lógica de comunicação com a API está 
centralizada no arquivo:

```/assets/js/api.js```

Este arquivo é responsável por todas as requisiçoes (GET, POST, PUT, DELETE) e pelo tratamento 
de erros.

### Autenticação

A API utiliza **Basic Authentication**. As estão atualmente codificadas 
em Base64 diretamente na ``api.js`` para todas as requisições:
```
    headers: {
        'Authorization': `Basic` ${btoa(`teste:teste123`)}`
    }
```

### Entidades Gerenciadas

As funções da ``api.js`` mapeiam para os seguintes métodos HTTP:
* ``loadEntities(entity)``: `GET /{entity}`
* ``findEntityById(entity, id)``: `GET /{entity}/{id}`
* ``createEntity(entity, data)``: `POST /{entity}`
* ``updateEntity(entity, id, data)``: `PUT /{entity}/{id}`
* ``deleteEntity(entity, id)``: `DELETE /{entity}/{id}`

`entity` sendo `clientes` ou `products`