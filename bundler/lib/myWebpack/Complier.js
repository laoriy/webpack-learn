
const { getAst, getDeps, getCode } = require('./parser')
const fs = require('fs')
const path = require('path')

class Complier {
  constructor(options = {}) {
    // webpack配置对象
    this.options = options;
    // 所有依赖容器
    this.modules = []
  }
  //启动webpack打包
  run () {
    //入口文件路径
    const filePath = this.options.entry;
    //第一次构建得到入口的信息
    const fileInfo = this.build(filePath)
    this.modules.push(fileInfo)
    // 遍历所有的依赖
    this.modules.forEach((fileInfo) => {
      // 提取依赖
      /** 
       *  deps
       *  { './add/js':'E:\\my-project\\webpack-learn\\bundler\\src\\computed\\add\\js',
            './count.js':'E:\\my-project\\webpack-learn\\bundler\\src\\computed\\count.js'
          }
       */
      // 取出当前文件的所有依赖进行依赖
      const { deps } = fileInfo
      for (const relativePath in deps){
        // 依赖文件的绝对路径
        const absoultPath = deps[relativePath]
        // 对依赖文件进行处理
        const subFileInfo = this.build(absoultPath)
        // 将处理后的结果添加到modules中，后面遍历就会遍历它了
        this.modules.push(subFileInfo)
      }
    })
    // 将依赖整理成更好的依赖关系图对象
    /**
     * {
     *    'index.js':{
     *        code:'xxx',
     *        deps:{ 'add.js':'abselout path'}
     *     },
     *     'add.js':{
     *        code:'xxx',
     *        deps:{}
     *     }
     *     ...
     * }
     */
    const depsGraph =  this.modules.reduce((graph,module)=>{
      return {
        ...graph,
        [module.filePath]:{
          code:module.code,
          deps: module.deps
        }
      }
    },{})

    this.generate(depsGraph)
    
  }

  // 开始构建
  build (filePath){
    // 1. 读取入口文件内容
    // 2. 将其解析成ast抽象语法树@babel/parser
    const ast = getAst(filePath)
    // 3.收集依赖@babel/traverse
    const deps = getDeps(ast, filePath)
    // 4 编译代码。将代码中浏览器不能识别的代码进行编译转化
    const code = getCode(ast)

    return{
      filePath,// 文件路径
      deps,//当前文件所有依赖
      code//当前文件解析后的代码
    }
  }
  // 生成输出资源
  generate (depsGraph){
    const bundle = `
      (function (depsGraph) {
        // require目的，为了加载入口文件
        function require(module){
          // 定义模块内部require函数
          function localRequire(relativePath){
            // 找到要导入模块的绝对路径
            return require(depsGraph[module].deps[relativePath])
          }

          // 定义暴露对象（将来模块要暴露的内容都在这里）
          var exports = {};

          (function(require,exports,code){
            eval(code)
          })(localRequire,exports,depsGraph[module].code)
          // 作为require函数的返回值返回出去
          // 为了后面的require函数能到到暴露的内容
          return exports
        }

        require('${this.options.entry}')

      })(${JSON.stringify(depsGraph)})
    ` 
    // 生成输出文件的绝对路径
    const filePath = path.resolve(this.options.output.path,this.options.output.filename)
    // 写入文件
    fs.writeFileSync(filePath,bundle,'utf-8')
  }
}

module.exports = Complier;
