const { BadRequestError, UnauthorizedError} = require('../utils/errors')
const db = require('../db')
const {BCRYPT_WORK_FACTOR} = require('../config')
const bcrypt = require('bcrypt')
const { use } = require('../routes/auth')


class User{

    static async makeUserPublic(user){
        return{
            id: user.id,
            email: user.email,
            username : user.username,
            first_name : user.first_name,
            last_name : user.last_name
        }
    }

    static async login(credentials){
        const requiredFields = ['email','password']
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in the body`)
            }
        })

        const user = await User.fetchUserByEmail(credentials.email)
        
        if (user){
        const isValid = await bcrypt.compare(credentials.password,user.password)
            if (isValid){
                {return User.makeUserPublic(user)}
            }

    }


        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError('Invalid email')
        }



        throw new UnauthorizedError("Invalid email or password")
    }

    static async register(credentials){
        const requiredFields = ['username','password','first_name','last_name','email']
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in the body`)
            }
        })

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError('Invalid email')
        }
        const existUser = await User.fetchUserByEmail(credentials.email)
    if (existUser) {
        throw new BadRequestError(`${credentials.email} already exist`)
    }

    const lowercasedEmail = credentials.email.toLowerCase()

    const hashedPw = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

    const result = await db.query(
        `INSERT INTO users(
            username,
            password,
            first_name,
            last_name,
            email
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username,first_name,last_name,email;`,
        [credentials.username,hashedPw,credentials.first_name,
            credentials.last_name,lowercasedEmail
        ]
    )

    const user = result.rows[0]
    return User.makeUserPublic(user)
    }

    static async fetchUserByEmail(email){
        if (!email)
        throw new BadRequestError('No email provided')

        const query = 'SELECT * FROM users WHERE email = $1'

        const results = await db.query(query, [email.toLowerCase()])
        const user = results.rows[0]
        return user
    }
}

 module.exports = User