const bcrypt = require('bcrypt')
const User = require('../Model/User');

const routes = [
    {
    method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const user = await User.find(); 
            return h.response(user)
        }
    },

    {
        method: 'POST',
        path: '/',
        handler: async (request, h) => {

            const { email, password } = request.payload

            const emailDoesExist = await User.findOne({email})

            if(emailDoesExist) return h.response("Email already registered")
            
            const saltRound = 10
            const salt = bcrypt.genSaltSync(saltRound)
            const hash = bcrypt.hashSync(password, salt)

            request.payload.password = hash

            const user = new User(request.payload)
            await user.save()
            return h.response(user)
        }
    },

    {
        method: ['PATCH', 'PUT'],
        path: '/{id}',
        handler: async (request, h) => {

            const { password } = request.payload

            if(password) {
                const saltRound = 10
                const salt = bcrypt.genSaltSync(saltRound)
                const hash = bcrypt.hashSync(password, salt)

                request.payload.password = hash
            }
            await User.findByIdAndUpdate(request.params.id, request.payload)
            return h.response("Updated")
        }
    },

    {
        method: 'DELETE',
        path: '/{id}',
        handler: async (request, h) => {
            await User.findByIdAndDelete(request.params.id);
            return h.response("Deleted")
        }
    },
]

module.exports = routes