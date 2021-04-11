# [Md-Talks](https://carlos8v.github.io/md-talks/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![Website Up](https://img.shields.io/website?url=https%3A%2F%2Fcarlos8v.github.io%2Fmd-talks%2F)
A simple markdown tech blog.

## The Project 💡️

![Screenshot](https://raw.githubusercontent.com/carlos8v/md-talks/main/screenshots/screenshot-1.0.0.png)

The main goal is to share knowledge with everyone, as **simple** as possible. *Md-Talks* uses [eleventy](https://github.com/11ty/eleventy) to make every `.md` file in the `src/articles` folder in a html custom template. Each article gets its own url hosted by [Github Pages](https://pages.github.com/), so you can share with your friends or coworkers. The latest articles show up at the front page on the website.

Although the objective is to share tech info, you are not limited by that. Feel free to post about what you want, information is free!

⚠️ For maintaining a welcoming environment as a community, we reinforce that you as a contributor are obligated to follow our code of conduct. Feel free to check it out [here](CODE_OF_CONDUCT.md).

## Contribution 🤝️

To contribute, first clone the repository and create a new branch with the pattern `article/article-name`. Then you can create your article in the `src/articles` folder as `my-article.md`.

⚠️ Please, don't change any existing file. If you do, your Pull Request will not be approved.

Remembering: before you build your article, first you will need to give some important information as follows:
```md
---
title: "My First Article! 🚀"
author:
  name: "Carlos Souza"
---

# Hello World!
...
```

The `title`, `author` and `name` info are **essential** to the formation of the output code in the website. As so, if you happen to forget it, the `jest` test will fail and you will be blocked to merge your content. But don't worry, you can check in the evaluator what's wrong and commit the fix.

Other optional informations you can provide are:
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

After that, you can commit the finals changes and push it to the repository with `git push -u origin article/article-name`. If your Pull Request passes the tests and get approved, you will be good to merge.

When your Pull Request gets merged, your article will get a url with the path of the name of the file. For example: a `eleventy-tutorial.md` will get a url like `https://.../articles/eleventy-tutorial`.

## Development ⚙️

During the formation of the article you can run a local server with the result of your article by running:
```bash
$ npm install
$ npm run serve
```

Then you can access the local output on your favorite browser at `http://localhost:8080/`.

If you need to reference something by the domain name or the localhost path (when the changes are not on the website yet), you can use the `domain` variable to translate the path.

```md
...
Check this [link]({{ domain }}/articles/not-in-the-website-yet)
...
```

The `{{ domain }}` will be translated to the correct domain once the code is merged in the repository or to `http://localhost:8080` if you are hosting locally by the `serve` script.

## Tests 🔧️

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

For now, you will need to fulfill these requisites:
| `Article.md` |
|:--|
| Article **must have** the `title` info |
| Article **must have** the `author` info |
| Article **must have** the `name` info |
| Article **must have** some `content` |


## License 📃️

[MIT](LICENSE)

[pull-request-info]: https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request