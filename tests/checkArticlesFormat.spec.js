const fs = require('fs');
const { resolve } = require('path');

expect.extend({
  hasProperty(recieved, { folder, expected, property }) {
    return recieved === expected ?
      {
        pass: true,
      } : {
        message: () => `\x1B[31m'${folder}'\x1B[39m file should have property \x1B[32m${property}\x1B[39m`,
        pass: false,
      };
  }
});

const articlesFolderPath = resolve(__dirname, '..', 'src', 'articles');
var articlesFolder;

describe('Check if all articles have the correct structure', () => {
  const getArticles = () => fs.readdirSync(articlesFolderPath)
    .filter((name) => name.includes('.md'));

  const hasTitle = (article) => /title:/g.test(article);
  const hasAuthor = (article) => /author:/g.test(article);
  const hasName = (article) => /name:/g.test(article);

  beforeAll(() => {
    articlesFolder = getArticles();
  })

  it('Check if articles have the Title Info', () => {
    articlesFolder.forEach(folder => {
      const article = fs.readFileSync(`${articlesFolderPath}/${folder}`, 'utf8');
      expect(hasTitle(article)).hasProperty({
        folder,
        expected: true,
        property: 'title',
      });
    })
  })

  it('Check if articles have the Author Info', () => {
    articlesFolder.forEach(folder => {
      const article = fs.readFileSync(`${articlesFolderPath}/${folder}`, 'utf8');
      expect(hasAuthor(article)).hasProperty({
        folder,
        expected: true,
        property: 'author',
      });
    })
  })

  it('Check if articles have the Name Info', () => {
    articlesFolder.forEach(folder => {
      const article = fs.readFileSync(`${articlesFolderPath}/${folder}`, 'utf8');
      expect(hasName(article)).hasProperty({
        folder,
        expected: true,
        property: 'name',
      });
    })
  })
});
