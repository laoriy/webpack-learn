/*
 * @Author: liuruijun
 * @Date: 2020-11-05 12:00:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-11 08:49:40
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
    const a = await import(
        /* webpackPrefetch: true */ /* webpackChunkName: "lodash"*/ "lodash"
    );
    const _ = a.default;
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

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}

let a = 2;
console.log(a);
