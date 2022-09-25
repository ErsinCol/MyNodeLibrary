const routes=require('./routes');
const fastify=require('fastify')({
    logger:true,
})

fastify.register(require('@fastify/cors'),{
    origin:'*',
    methods: ["POST","PUT","DELETE","GET"]
});

routes.forEach((route,index)=>{
    fastify.route(route);
});

const run =async()=>{
    try{
        await fastify.listen(3000);
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
};

run();


