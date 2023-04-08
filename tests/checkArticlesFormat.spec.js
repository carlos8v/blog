const fs = require('fs');
const { resolve } = require('path');

expect.extend({
  hasProperty(recieved, { post, expected, property }) {
    return recieved === expected ?
      {
        pass: true,
      } : {
        message: () => 
          `\x1B[31m'${post}'\x1B[39m file should have property \x1B[32m${property}\x1B[39m`,
        pass: false,
      };
  },
  hasContent(recieved, { post, expected }) {
    return recieved === expected ?
    {
      pass: true,
    } : {
      message: () => `\x1B[31m'${post}'\x1B[39m file should have some \x1B[32mcontent\x1B[39m`,
      pass: false,
    }
  },
});

const postsFolderPath = resolve(__dirname, '..', 'src', 'posts');
var postsFolder;

describe('Check if all posts have the correct structure', () => {
  const getArticles = () => fs.readdirSync(postsFolderPath)
    .filter((name) => name.includes('.md'));

  const hasTitle = (post) => /title:/g.test(post);
  const hasAuthor = (post) => /author:/g.test(post);
  const hasName = (post) => /name:/g.test(post);
  const hasContent = (post) => post !== '' && !/^\s*$/g.test(post);

  beforeAll(() => {
    postsFolder = getArticles();
  })

  it('Check if post have the Title Info', () => {
    postsFolder.forEach(postName => {
      const post = fs.readFileSync(`${postsFolderPath}/${postName}`, 'utf8');
      expect(hasTitle(post)).hasProperty({
        post: postName,
        expected: true,
        property: 'title',
      });
    })
  })

  it('Check if post have the Author Info', () => {
    postsFolder.forEach(postName => {
      const post = fs.readFileSync(`${postsFolderPath}/${postName}`, 'utf8');
      expect(hasAuthor(post)).hasProperty({
        post: postName,
        expected: true,
        property: 'author',
      });
    })
  })

  it('Check if post have the Name Info', () => {
    postsFolder.forEach(postName => {
      const post = fs.readFileSync(`${postsFolderPath}/${postName}`, 'utf8');
      expect(hasName(post)).hasProperty({
        post: postName,
        expected: true,
        property: 'name',
      });
    })
  })

  it('Check if post have some Content', () => {
    const separator = '---';
    postsFolder.forEach(postName => {
      const post = fs.readFileSync(`${postsFolderPath}/${postName}`, 'utf8')
        .split(separator);
      expect(hasContent(post[2].trim())).hasContent({
        post: postName,
        expected: true,
      });
    })
  })
});
