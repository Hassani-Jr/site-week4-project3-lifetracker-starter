const bcrypt = require('bcrypt')

const pw = 'abc123'

bcrypt.hash(pw, 6, (err, hashedPw) => {
    console.log(`password is ${pw}`)
    console.log(`Hashed password is  ${hashedPw}`)
})