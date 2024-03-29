const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setBrowserSyncConfig({
    files: ['src/**/*'],
    open: true,
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addFilter("displayDate", function(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  });

  eleventyConfig.setTemplateFormats(['md', 'liquid']);
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/favicon.svg': 'favicon.svg' });
  eleventyConfig.addPassthroughCopy({ 'src/favicon.ico': 'favicon.ico' });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
