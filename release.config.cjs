const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',

    ['@semantic-release/github', {
      'assets': ['dist/index.html']
    }],
    '@semantic-release/git',
  ]
};

module.exports = config;