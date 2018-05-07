
const schema = {
  type: 'object',
  properties: {
    strategy: { type: 'string' },
    allowLocalFilesAccess: { type: 'boolean' }
  }
}

module.exports = {
  'name': 'phantom-image',
  'main': 'lib/phantom.js',
  'dependencies': ['templates'],
  'optionsSchema': {
    phantom: { ...schema },
    extensions: {
      'phantom-image': { ...schema }
    }
  },
  'embeddedSupport': true
}
