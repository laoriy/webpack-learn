/*
 * @Author: liuruijun
 * @Date: 2020-11-05 12:00:33
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-07 17:49:54
 * @Description: file content
 */
/*
 * @Author: liuruijun
 * @Date: 2020-11-05 12:00:33
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-07 15:28:01
 * @Description: file content
 */
// import _ from "lodash";
// console.log(_.join(['a','b','c']),'***');
// import a from './print.js'
// a()
const load = async () => {
  console.log(33);
  var element = document.createElement("div");
  await import(/* webpackPrefetch: true */ /* webpackChunkName: "lodash"*/ "lodash");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
};

document.addEventListener("click", () => {
  load().then((ele) => {
    const d = document.documentElement || document.body;
    d.appendChild(ele);
    console.log(23);
  });
});
