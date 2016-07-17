(function (params) {
    global.co = require('co');
    var fs = require('fs');
    var files = fs.readdirSync(__dirname);
    files.forEach((file) => {
        var name = file.replace('.t.js', '');
        var tool = {};
        // file.indexOf('.t.js') > -1 && (module.exports[name] = require(`${__dirname}/${file}`));
        // file.indexOf('.js') < 0 && (module.exports[file] = require(`${__dirname}/${file}`));
        (file.indexOf('.t.js') > -1 || file.indexOf('.js') < 0) && (tool = require(`${__dirname}/${file}`));
        (typeof tool == 'function' || Object.keys(tool).length) && (global[name] = tool)
    });
} ());