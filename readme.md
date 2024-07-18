# Gerenciamento de Produtos Frontend

Esta aplicação frontend é construída com React e Vite, utilizando React Hook Form, Zod para validação de formulários e Axios para comunicação com a API de gerenciamento de produtos.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Tecnologias Utilizadas

- React
- Vite
- React Hook Form
- Zod
- Axios

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheus-calixto-silva/my-products
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd my-products
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente para apontar para a URL da API:

```
VITE_API_URL=http://localhost:3000
```

## Uso

Para iniciar a aplicação, execute o comando:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

## Estrutura de Pastas

```bash
├── src
│   ├── app
│   │   ├── config
│   │   ├── contexts
│   │   ├── hooks
│   │   ├── interfaces
│   │   ├── libs
│   │   ├── Router.tsx
│   │   ├── services
│   │   └── utils.ts
│   ├── views
│   │   ├── components
│   │   │   ├── Loading.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   └── ...
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── Product.tsx
│   │   │   └── ...
│   │   └── styles
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
