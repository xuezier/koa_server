(function () {
    const http = require('http');
    const URL = require('url');

    module.exports = (url, options, cb) => {
        /**
         * options is a object
         * url: String
         * method: String,'POST','GET','PUT','DELETE',default 'GET'
         * headers Object,httpHeaders,
         * data: String
         * 
         * cb,callback function,parameters:
         * statusCode,response,body
         */

        // check url
        typeof url == 'string' ?
            typeof options == 'object' ? options.url = url :
                (cb = options,
                    options = {
                        url: url,
                        method: 'Get'
                    }
                )
            : (
                options = url,
                cb = options
            );

        // toUpperCase Method
        var methoderr = new Error('method only allowed post,get,put,delete');
        var method = (options.method || 'GET').toUpperCase();

        // data must be a String value or Buffer.
        if (options.data && ((typeof options.data != 'string') && !Buffer.isBuffer(options.data))) {
            var err = new Error('data must a String value or Buffer');
            console.error(err.stack);
            return;
        }

        // parse url
        var _url = URL.parse(options.url);
        var _options = {
            host: _url.host,
            hostname: _url.hostname,
            port: _url.port,
            protocol: _url.protocol,
            path: _url.path,
            headers: options.headers || options.header || {}
        };

        // switch method
        switch (method) {
            case 'GET':
                return new Promise((resolve, reject) => {
                    _options.method = method;
                    var req = doRequest(_options, resolve, reject, cb)
                    req.end();
                });
            case 'POST':
            case 'PUT':
            case 'DELETE':
                return new Promise((resolve, reject) => {
                    _options.method = method;
                    options.data && (_options.headers['Content-Length'] = options.data.length);
                    var req = doRequest(_options, resolve, reject, cb)
                    options.data && req.write(options.data);
                    req.end();
                });
            default:
                console.error(methoderr.stack);
                return;
        }
    }

    // create a ClientRequest
    function doRequest(opts, resolve, reject, callback) {
        var req = new http.request(opts, (res) => {
            var body = [];
            var length = 0;
            var len = res.headers['content-length'] || 0;
            res.on('readable', () => {
                res.pause();
                var bf = res.read();
                Buffer.isBuffer(bf) ? (
                    body.push(bf), length += bf.length
                ) : false;
                !(length < len) && (
                    res.emit('done', body),
                    res.resume()
                );
            });

            res.on('done', (chunk) => {
                resolve(chunk && chunk.toString('utf-8', 0));
                (typeof callback == 'function' && callback(res.statusCode, res, Buffer.concat(body)));
            });
        });
        return req;
    }

} ());