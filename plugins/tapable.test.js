const {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook,
} = require("tapable");

class Lesson {
    constructor() {
        // 初始hooks容器
        this.hooks = {
            //同步hooks,任务依次执行
            // go: new SyncHook(["address"]),
            go: new SyncBailHook(["address"]), // 遇到return返回值就不再执行后面的
            //异步并行hooks
            // leave: new AsyncParallelHook(["name", "age"]),
            //异步串行
            leave:new AsyncSeriesHook(["name", "age"]),
        };
    }
    tap() {
        // 往hooks容器中注册事件，添加回调函数
        this.hooks.go.tap("class1220", (address) => {
            console.log("class1220", address);
            return null;
        });
        this.hooks.go.tap("class0122", (address) => {
            console.log("class0122", address);
        });

        this.hooks.leave.tapAsync("leave1", (name, age, cb) => {
            setTimeout(() => {
                console.log("leave1", name, age);
                cb();
            }, 2000);
        });
        this.hooks.leave.tapPromise("leave2", (name, age) => {
            return new Promise((reslove) => {
                setTimeout(() => {
                    console.log("leave2", name, age);
                    reslove();
                }, 1000);
            });
        });
    }

    start() {
        //触发钩子函数
        this.hooks.go.call("guangdong");
        this.hooks.leave.callAsync("laor", 18, function () {
            // 代表所有leave容器中得函数触发完了，才触发
            console.log("end");
        });
    }
}

const l = new Lesson();
l.tap();
l.start();
