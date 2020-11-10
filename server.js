const Hapi = require('@hapi/hapi')
const connectDB = require('./config/db')
const routes = require('./Routes/index');
require('dotenv').config({path: "./config/.env"})

connectDB();

const init = async () => {
    const server = new Hapi.Server({
        port: 3000,
        host: "localhost"
    })

    server.route(routes)

    await server.start()
    console.log(`Server started at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) =>{
    console.log(err)
    process.exit(1)
})

init();