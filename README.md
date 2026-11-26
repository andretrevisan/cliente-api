# Gerenciador de universidades

API Client e aplicação web desenvolvida em **React**, **Next.js**, **Tailwind CSS** e **shadcn/ui** para listar, gravar, alterar e excluir universidades integradas ao servidor **MockAPI** (`https://mockapi.io/`), com deploy em produção e código-fonte disponível no **GitHub**.

## Funcionalidades

- **GET**: carrega e atualiza a lista de universidades.
- **POST**: cadastra uma universidade com nome e endereço.
- **PUT**: edita os dados de uma universidade existente.
- **DELETE**: exclui uma universidade após confirmação.

A interface usa botões, tabela e um modal de formulário com componentes shadcn/ui. O modal é compartilhado entre cadastro e edição.

## Endpoint da API

```text
[https://6afe2fc83a0e70bc8d532dd2.mockapi.io/frontend/api/universidades](https://6afe2fc83a0e70bc8d532dd2.mockapi.io/frontend/api/universidades)