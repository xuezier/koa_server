(function () {

    var colors = require('colors');

    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'red',
        info: 'green',
        data: 'blue',
        help: 'cyan',
        warn: 'yellow',
        debug: 'magenta',
        error: 'red'
    });

    function printStr(data) {
        var str = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i] == undefined) {
                continue;
            };
            if (data[i] instanceof Object) {
                var _s = JSON.stringify(data[i]);
                str += _s == "{}" ? data[i].toString() : _s;
            } else {
                str += data[i];
            };
            str += " ";
        };
        return str;
    };
    // 打印错误
    global.printError = function () {
        var data = arguments || [];
        var strprefix = "Error(" + (new Date()).toLocaleString() + "):";
        var str = printStr(data) || "";
        console.log((strprefix + str + "").error);
        return { type: "error", toString: str };
    };
    // 打印成功
    global.printSuccess = function () {
        var data = arguments;
        var strprefix = "Success(" + (new Date()).toLocaleString() + "):";
        var str = printStr(data) || "";
        console.log((strprefix + str + "").info);
        return str;
    };
    // 常规打印
    global.print = function () {
        var data = arguments;
        var strprefix = "(" + (new Date()).toLocaleString() + "):";
        var str = printStr(data) || "";
        console.log((strprefix + str + "").data);
        return str;
    };
    // 打印数据
    global.printData = function () {
        var data = arguments;
        var strprefix = "Data(" + (new Date()).toLocaleString() + "):";
        var str = printStr(data) || "";
        console.log((strprefix + str + "").warn);
        return str;
    };
} ());