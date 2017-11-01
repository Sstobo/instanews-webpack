module.exports = {
  entry: './src/scripts.js', 
  devtool: "inline-source-map",
  output: {
     filename: './build/bundle.js'
  },
  module: {
    
    rules: [
    // ...other loaders...
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file?name=public/fonts/[name].[ext]'
      }]
    },
      {
         test: /\.scss$/,
         use: [
           {
             loader: 'style-loader'
           },
           {
             loader: 'css-loader',
             options: {
               sourceMap: true
             }
           },
           {
             loader: 'sass-loader',
             options: {
              sourceMap: true
            }
           }
         ]
      },
   ]
 }
};