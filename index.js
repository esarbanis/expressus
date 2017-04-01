const http = require('http');
const url = require('url');

const registry = {
    GET: {}
};

const interceptor = (req, res) => {
    const path = url.parse(req.url).pathname;
    const {method} = req;
    const action = registry[method][path];

    action(req, res);
};

module.exports = () => {
    const server = http.createServer(interceptor);

    return Object.assign(server, {
        get(path, action) {
            registry.GET[path] = action;
        }
    });
};