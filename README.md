# Cliente de API com Next.js, React, MockAPI e shadcn/ui

Aplicação web desenvolvida com **Next.js** e **React** para consumo de API e comunicação com um cliente HTTP estruturado, utilizando **MockAPI** como backend simulado e **shadcn/ui** na interface.

## Visão Geral

O projeto separa a camada de acesso a dados da interface visual por meio de um cliente de API centralizado, permitindo realizar operações de leitura e escrita contra endpoints do MockAPI de forma previsível e reutilizável.

## Stack e Ferramentas

- **Next.js** e **React** — estrutura da aplicação, rotas e componentes de interface
- **shadcn/ui** — componentes acessíveis e estilizados sobre Tailwind CSS
- **MockAPI** — simulação de recursos REST e testes de integração

## Estrutura do Projeto

- Camada de cliente de API — encapsula URL base, cabeçalhos, tratamento de respostas e erros HTTP
- Serviços / recursos — funções dedicadas ao consumo dos endpoints do MockAPI
- Interface (`app/` e componentes) — renderização de estados de carregamento, dados e formulários com componentes shadcn/ui

## Como Executar Localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev