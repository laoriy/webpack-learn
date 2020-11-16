class CopyrightWebpackPlugin {
  constructor(options){
  }
  apply(compiler){
    compiler.hooks.compile.tap('CopyrightWebpackPlugin',()=>{
      console.log(2);
    })
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (params, cb) => {
      debugger
      params.assets['test.txt'] = {
        source:()=>{
          return 'hello this is text'
        },
        size :()=>{
          return 18
        }
      }
      cb()
    });
  }
}

module.exports = CopyrightWebpackPlugin