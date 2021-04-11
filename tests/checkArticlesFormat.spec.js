const fs = require('fs');
const { resolve } = require('path');

expect.extend({
  hasProperty(recieved, { article, expected, property }) {
    return recieved === expected ?
      {
        pass: true,
      } : {
        message: () => 
          `\x1B[31m'${article}'\x1B[39m file should have property \x1B[32m${property}\x1B[39m`,
        pass: false,
      };
  },
  hasContent(recieved, { article, expected }) {
    return recieved === expected ?
    {
      pass: true,
    } : {
      message: () => `\x1B[31m'${article}'\x1B[39m file should have some \x1B[32mcontent\x1B[39m`,
      pass: false,
    }
  },
});

const articlesFolderPath = resolve(__dirname, '..', 'src', 'articles');
var articlesFolder;

describe('Check if all articles have the correct structure', () => {
  const getArticles = () => fs.readdirSync(articlesFolderPath)
    .filter((name) => name.includes('.md'));

  const hasTitle = (article) => /title:/g.test(article);
  const hasAuthor = (article) => /author:/g.test(article);
  const hasName = (article) => /name:/g.test(article);
  const hasContent = (article) => article !== '' && !/^\s*$/g.test(article);

  beforeAll(() => {
    articlesFolder = getArticles();
  })

  it('Check if articles have the Title Info', () => {
    articlesFolder.forEach(articleName => {
      const article = fs.readFileSync(`${articlesFolderPath}/${articleName}`, 'utf8');
      expect(hasTitle(article)).hasProperty({
        article: articleName,
        expected: true,
        property: 'title',
      });
    })
  })

  it('Check if articles have the Author Info', () => {
    articlesFolder.forEach(articleName => {
      const article = fs.readFileSync(`${articlesFolderPath}/${articleName}`, 'utf8');
      expect(hasAuthor(article)).hasProperty({
        article: articleName,
        expected: true,
        property: 'author',
      });
    })
  })

  it('Check if articles have the Name Info', () => {
    articlesFolder.forEach(articleName => {
      const article = fs.readFileSync(`${articlesFolderPath}/${articleName}`, 'utf8');
      expect(hasName(article)).hasProperty({
        article: articleName,
        expected: true,
        property: 'name',
      });
    })
  })

  it('Check if articles have some Content', () => {
    const separator = '---';
    articlesFolder.forEach(articleName => {
      const article = fs.readFileSync(`${articlesFolderPath}/${articleName}`, 'utf8')
        .split(separator);
      expect(hasContent(article[2].trim())).hasContent({
        article: articleName,
        expected: true,
      });
    })
  })
});
