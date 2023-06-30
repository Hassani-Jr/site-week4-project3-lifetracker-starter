const { BadRequestError, UnauthorizedError} = require('../utils/errors')
const db = require('../db')


class User{
    static async login(credentials){




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

    const result = await db.query(
        `INSERT INTO users(
            username,
            password,
            first_name,
            last_name,
            email
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username,first_name,last_name,email;`,
        [credentials.username,credentials.password,credentials.first_name,
            credentials.last_name,lowercasedEmail
        ]
    )

    const user = result.rows[0]
    return user
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