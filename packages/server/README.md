# Server

## Camadas

- shared -> Providers compartilhados
- modules -> Módulos de domínio do projeto
- @types -> Tipos incrementados ou modificados
- config -> Configuração de dependências ou de ambiente

## Módulos

### Usuários (users)

Para controle de autenticação

### Pedidos (orders)

Para controle de pedidos do sistema, assim como produtos e fornecedores.

- Aciona controle de estoque ao criar pedido

### Clientes (clients)

Para controle de clientes do sistema

### Notificações (notifications)

Para controle de notificações do sistema

- Acionado quando é criado um novo pedido
