/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-04 11:39:49
 * @Description: file content
 */
import style from  './index.scss'
import createAvatar from './createAvatar'
import avatar from "./result.png";
import './style.css'

var btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.appendChild(btn)
btn.onclick = function() {
  var div = document.createElement('div')
  div.innerHTML = 'item',
  document.body.appendChild(div)
}

const wrapper = document.getElementById('root')
wrapper.innerHTML ='<div class="iconfont icon-changjingguanli">hello world</div>'
const img = new Image()
img.src = avatar
img.classList.add(style.avatar)
wrapper.appendChild(img)

createAvatar()
