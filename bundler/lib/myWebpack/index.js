const  Complier = require('./Complier')

function myWebpack(config) {
    return new Complier(config);
}

module.exports = myWebpack;
