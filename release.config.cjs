const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',

    ['@semantic-release/github', {
      'assets': [
        {path: 'dist/index.html', name: `calculs-${nextRelease.version}.html`}
      ]
    }],
    '@semantic-release/git',
  ]
};

module.exports = config;