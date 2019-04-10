const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use( proxy ("/auth/*",  { target: 'http://localhost:5000' }));
    app.use( proxy ("/api/*", { target: 'http://localhost:5000' }));
    app.use( proxy ("/review/*", { target: 'http://localhost:5000' }));
    app.use( proxy ("/items/*", { target: 'http://localhost:5000' }));
    app.use( proxy ("/images/*", { target: 'http://localhost:5000' }));
    app.use(proxy ("/user/*", {target: 'http://localhost:5000'}))
    app.use(proxy ("/categories/*", {target: 'http://localhost:5000'}))
    app.use(proxy ("/sizes/*", { target: 'http://localhost:5000'}))
}