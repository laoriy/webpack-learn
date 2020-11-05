/*
 * @Author: liuruijun
 * @Date: 2020-11-05 12:00:33
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-05 17:55:32
 * @Description: file content
 */
import _ from 'lodash'
// console.log(_.join(['a','b','c']),'***');

const load = async () => {
  var element = document.createElement('div');
  // await import(/* webpackChunkName: "lodash" */ 'lodash')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

document.addEventListener('click',()=>{
  load().then(ele => {
    document.body.appendChild(ele);
  })
})

