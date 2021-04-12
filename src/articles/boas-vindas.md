---
title: "Iniciando o projeto com tudo! 🚀"
cover: "https://miro.medium.com/max/13336/1*PNBzVeucHWh68LdTukOJLw.png"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
tags: ["Projeto", "🇧🇷️"]
---

# [Md-Talks]({{ repo }}) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![Website Up](https://img.shields.io/website?url=https%3A%2F%2Fcarlos8v.github.io%2Fmd-talks%2F)
Um simples blog markdown sobre tecnologia.

## O Projeto 💡️

O objetivo princial é compartilhar conhecimento com todo mundo, o mais **simples** possível. *Md-Talks* usa o [eleventy](https://github.com/11ty/eleventy) para transformar qualquer arquivo `.md` na pasta `src/articles` em um template html customizado. Cada artigo ganha sua própria url hospedado no [Github Pages](https://pages.github.com/), para você poder compartilhar com seus amigos e colegas de trabalho. Os últimos artigos postados aparecem na página principal do site.

Embora o objetivo seja compartilhar informações sobre tecnologia, você não é limitado por isso. Sinta-se livre para postar sobre o que quiser, o conhecimento é livre!

⚠️ Para manter um ambiente acolhedor como uma comunidade, nós reinforçamos que você, como contribuidor, é obrigado a seguir o nosso código de conduta. Sinta-se livre para checar [aqui](https://github.com/carlos8v/md-talks/blob/main/CODE_OF_CONDUCT.md).


## Contribuição 🤝️

Para contribuir você só precisa fazer um aquivo `.md` na pasta `src/articles` e criar um [Pull Request][pull-request-info]. Lembrando de passar algumas informações importantes como o exemplo a seguir:

```md
---
title: "My First Article! 🚀"
author:
  name: "Carlos Souza"
---

# Hello World!
...
```

As informações `title`, `author` e `name` são **essenciais** para a formação do código no site. Então, se você esquecer de colocá-las, o teste do `jest` falhará e você será bloqueado de mergear seu conteúdo. Mas não se preocupe, você pode checar no avaliador o que está incorreto e commitar as correções.

Outras informações opcionais que você pode prover são:
```md
...
cover: "https://my-awesome-picture.com/crazy-pic.png"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
tags: ["Tutorial", "🇺🇸️"]
---
...
```

Quando seu Pull Request for mergeado, seu artigo receberá uma url com o caminho similar ao nome do arquivo. Por exemplo: o arquivo `eleventy-tutorial.md` receberá uma url como `https://.../articles/eleventy-tutorial`.


## Desenvolvimento ⚙️

Durante a formação do artigo você pode rodar um servidor local com o resultado do seu artigo rodando:

```bash
$ npm install
$ npm run serve
```

Então você pode acessar o output local no seu navegador preferido com a url `http://localhost:8080`.

Se você precisa referenciar algo pelo domínio ou pelo caminho do localhost (quando as mudanças ainda não estão no site), você pode usar a variável `domain` para traduzir o caminho.

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

| `Artigo.md` |
|:--|
| Artigo **precisa** ter a informação `title` |
| Artigo **precisa** ter a informação `author` |
| Artigo **precisa** ter a informação `name` |
| Artigo **precisa** ter a informação algum `conteúdo` |


## License 📃️

[MIT](LICENSE)

[pull-request-info]: https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request