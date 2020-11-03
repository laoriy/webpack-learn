/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-03 09:07:43
 * @Description: file content
 */
import style from  './index.scss'
import createAvatar from './createAvatar'
import avatar from "./result.png";

const wrapper = document.getElementById('root')
wrapper.innerHTML ='<div class="iconfont icon-changjingguanli">hello world</div>'
const img = new Image()
img.src = avatar
img.classList.add(style.avatar)
wrapper.appendChild(img)

createAvatar()
