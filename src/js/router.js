var Router = require('react-router');
var routes = require('./routes');
var RouterStore = require('./stores/RouterStore');

// we can create a router before "running" it
var router = Router.create({
    routes: routes,
    location: Router.HashLocation
});
RouterStore.set(router);

module.exports = router;