const controllers=require('../controllers/controllers');
const routes=[
    {
        method: "GET",
        url: "/",
        handler: controllers.home,
    },
    {
        method: "GET",
        url: "/users",
        handler: controllers.createVisitor,
    },
    {
        method: "POST",
        url: "/users",
        handler: controllers.createVisitor,
    },

]

module.exports= routes;