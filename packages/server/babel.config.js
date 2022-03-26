module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@modules': './src/modules',
        '@database/*': ['./src/database/*']
      }
    }]
  ]
}
