/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')

const CracoAlias = require('craco-alias')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@components/*': path.resolve(__dirname, 'src/components/*'),
      '@store/*': path.resolve(__dirname, 'src/store/*'),
      '@hooks/*': path.resolve(__dirname, 'src/hooks/*'),
      '@types/*': path.resolve(__dirname, 'src/types/*')
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.json'
      }
    }
  ]
}
