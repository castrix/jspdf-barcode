const path = require('path');

module.exports = [
  {
    // UMD build configuration (CommonJS and Global compatible)
    mode: 'production',
    entry: './src/index.ts',  // Entry point for TypeScript
    output: {
      path: path.resolve(__dirname, 'dist'),  // Output directory
      filename: 'index.umd.js',  // UMD output filename
      library: {
        type: 'umd',  // UMD format
      },
      globalObject: 'this',  // Compatibility for Node.js and browsers
    },
    module: {
      rules: [
        {
          test: /\.ts$/,  // Handle TypeScript files (.ts only)
          exclude: /node_modules/,
          use: 'ts-loader',  // Use ts-loader for TypeScript files
        },
        {
          test: /\.js$/,  // Handle JavaScript files
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],  // Resolve .ts and .js extensions
    },
  },
  {
    // ES Module build configuration (For modern environments using `import`)
    mode: 'production',
    entry: './src/index.ts',  // Entry point for TypeScript
    output: {
      path: path.resolve(__dirname, 'dist'),  // Output directory
      filename: 'index.esm.js',  // ES Module output filename
      library: {
        type: 'module',  // ES Module format
      },
    },
    experiments: {
      outputModule: true,  // Enable ES module output
    },
    module: {
      rules: [
        {
          test: /\.ts$/,  // Handle TypeScript files (.ts only)
          exclude: /node_modules/,
          use: 'ts-loader',  // Use ts-loader for TypeScript files
        },
        {
          test: /\.js$/,  // Handle JavaScript files
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],  // Resolve .ts and .js extensions
    },
  },
];
