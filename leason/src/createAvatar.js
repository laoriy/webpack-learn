/*
 * @Author: liuruijun
 * @Date: 2020-11-02 14:43:21
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-02 14:50:01
 * @Description: file content
 */
import avatar from "./result.png";

function createAvatar () {
  const wrapper = document.getElementById('root')
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')
  wrapper.appendChild(img)
}

export default createAvatar