module.exports = class Plugin1 {
    apply(complier) {
        complier.hooks.emit.tap("Plugin1", (complilation) => {
            console.log("ssss");
        });
    }
};
