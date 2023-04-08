---
title: "Iniciando o projeto com tudo! 🚀"
cover: "https://www.markdownguide.org/assets/images/markdown-guide-og.jpg"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
tags: ["Projeto", "🇧🇷️"]
---

# [Blog]({{ repo }}) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]({{ repo }}/blob/main/LICENSE) ![Website Up](https://img.shields.io/website?url=https%3A%2F%2Fblog.carlos8v.dev)
Um simples blog sobre tecnologia.

## O Projeto 💡️

O objetivo principal é compartilhar conhecimento com todo mundo, o mais **simples** possível. O projeto usa [eleventy](https://github.com/11ty/eleventy) para transformar qualquer arquivo `.md` na pasta `src/posts` em um template _html_ customizado. Cada post ganha sua própria url hospedado no [Github Pages](https://pages.github.com/). Os últimos posts postados aparecem na página principal do site.

## Configuração 🤝️

Todos os posts precisam estar dentro da pasta `src/posts` e seguir o formado: `seu-post.md`.

Informações importantes no _frontmatter_ do post:

```md
---
title: "My First Article! 🚀"
author:
  name: "Carlos Souza"
---

# Hello World!
...
```

As informações `title`, `author` e `name` são **essenciais** para a formação do código no site.

Outras informações opcionais:
```md
...
cover: "https://my-awesome-picture.com/crazy-pic.png"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
tags: ["Tutorial"]
---
...
```

## Desenvolvimento 🎯️

Rodando localmente:

```bash
$ npm install
$ npm run serve
```

O servidor estará disponível na url `http://localhost:8080`. Para hospedar altere a variável `domain` no arquivo `src/_data/eleventyComputed.js`.

```md
...
Check this [link]({{ domain }}/articles/ainda-nao-esta-no-site)
...
```

O `{{ domain }}` será traduzido para o domínio correto assim que o código for mergeado no repositório ou para `http://localhost:8080` se você estiver hospedando localmente pelo script `serve`;


## Testes 🔧️

Para rodar os testes, primeiro você precisa instalar as dependências, então rodar `npm test`:

```bash
$ npm install
$ npm test
```

Por enquanto, você precisa preencher esses requisitos:

| `Post.md` |
|:--|
| Post **precisa** ter a informação `title` |
| Post **precisa** ter a informação `author` |
| Post **precisa** ter a informação `name` |
| Post **precisa** ter algum `conteúdo` |
