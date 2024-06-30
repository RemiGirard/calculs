export default {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      "preset": "angular",
      "releaseRules": [
        {"type": "docs", "scope":"README", "release": "patch"},
        {"type": "refactor", "release": "patch"},
        {"type": "style", "release": "patch"}
      ],
    }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', {
      prepareCmd: 'mv dist/index.html dist/index-${nextRelease.version}.html'
    }],
    ['@semantic-release/github', {
      'assets': [
        {path: 'dist/index-*.html'}
      ]
    }],
    '@semantic-release/git',
  ]
};
