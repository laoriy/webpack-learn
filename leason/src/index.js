/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-02 09:11:45
 * @Description: file content
 */
import header from "./header";
import avatar from "./result.png";
import './index.scss'

function log() {
  console.log(header);
  const wrapper = document.getElementById('root')
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')
  wrapper.appendChild(img)
}

log();
