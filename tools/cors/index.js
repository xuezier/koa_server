module.exports = (obj, options) => {
    return function* (next) {
        var can_next = false;
        var _origin = (this.header.origin || '*') + '';
        var arr = [];
        options.strict ? arr = options.origin.filter((item) => {
            return item == _origin;
        }) :
            arr = options.origin.filter((tem) => {
                return (_origin.indexOf(item) > -1);
            });
        can_next = arr.length;
        this.set('Access-Control-Allow-Origin', _origin);
        this.set('Access-Control-Allow-Credentials', options.credentials || _origin == '*' ? false : true);
        this.set('Access-Control-Allow-Methods', options.allowMethods || obj.defaultCorsOptions.allowMethods);
        return can_next ? yield next : (console.log('No Allowed Origin'), this.status = 403);
    };
}