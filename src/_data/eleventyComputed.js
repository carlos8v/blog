const local = 'http://localhost:8080'
const domain = 'https://carlos8v.github.io/blog';
const DEBUB = process.env.MODE === 'development';

module.exports = {
  repo: 'https://github.com/carlos8v/blog',
  domain: DEBUB ? local : domain,
  rootPath: function(data) {
    return data.page.url
      .split('/')
      .filter(function(x) {
        return x;
      })
      .map(function() {
        return '../';
      })
      .join('');
  }
}
