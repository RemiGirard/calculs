const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', {
      prepareCmd: 'mv dist/index.html dist/index-${nextRelease.version}.html'
    }],
    ['@semantic-release/github', {
      'assets': [
        {path: 'dist/index-*.html', name: `calculs-${nextRelease.version}.html`}
      ]
    }],
    '@semantic-release/git',
  ]
};

module.exports = config;