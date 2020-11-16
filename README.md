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

plugin:
 