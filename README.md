<!--
 * @Author: your name
 * @Date: 2020-10-26 19:38:43
 * @LastEditTime: 2020-11-11 22:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\README.md
-->
# webpack-learn
学习webpack


提升webpack打包速度：
  1.跟上技术的迭代（npm,yarn,node等）
  2.在尽可能少的模块上应用loader（缩小作用范围）
  3.Plugin应尽可能精简并确定可靠
  4.resolve参数合理配置,不要滥用extensions,alias，mainfile
  5.使用dllplugin提高打包速率
  6.cdn
  7.thread-loader,parallel-webpack,happypack多进程打包


loader:
  1.本质是一个函数
  2.可以直接返回，异步返回，callback
  3.功能，国际化，异常捕获

webpack执行流程：
1.初始化 Compiler:new Webpack(config) 得到 Compiler 对象
2.开始编译：调用 Compiler 对象 run 方法开始执行编译
3.确定入口：根据配置中的 entry 找出所有的入口文件
4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，递归直到所有模块被加载进来。
5.完成模块编译：再经过第 4 步使用 Loader 编译完所有模块以后，得到了每个模块被编译后的最终内容以及它们之间的依赖关系。
6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk ，再把每个 Chunk 转换成一个单独的文件加载到输出列表。（注意：这一步是可以修改输出内容的最后机会）
7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
 