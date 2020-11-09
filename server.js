const Hapi = require('@hapi/hapi')
const connectDB = require('./config/db')
const User = require('./Model/User')
require('dotenv').config({path: "./config/.env"})

connectDB();

const init = async () => {
    const server = new Hapi.Server({
        port: 3000,
        host: "localhost"
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const user = await User.find(); 
            return h.response(user)
        }
    })

    server.route({
        method: 'POST',
        path: '/',
        handler: async (request, h) => {
            const user = new User(request.payload);
            await user.save()
            return h.response(user)
        }
    })

    server.route({
        method: 'PATCH',
        path: '/{id}',
        handler: async (request, h) => {
            await User.findByIdAndUpdate(request.params.id, request.payload);
            return h.response("Updated")
        }
    })

    server.route({
        method: 'DELETE',
        path: '/{id}',
        handler: async (request, h) => {
            await User.findByIdAndDelete(request.params.id);
            return h.response("Deleted")
        }
    })

    await server.start()
    console.log(`Server started at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) =>{
    console.log(err)
    process.exit(1)
})

init();