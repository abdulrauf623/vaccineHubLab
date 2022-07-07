
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("/Users/abdul.karim/vaccineHubLab/config")

const db = require("/Users/abdul.karim/vaccineHubLab/db")



class User {



    static async register(credentials){



        // to register people into a database 


        const requiredFields = ["email", "password", "first_name", "last_name", "location", "date"]


        requiredFields.forEach(field => {



            if (!credentials.hasOwnProperty(field)){

                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })


        const existingUser = await User.fetchUserByEmail(credentials.email)

        if (existingUser){

            throw new BadRequestError(`Email already exists: ${credentials.email} `)
        }


        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)


        const lowerCasedEmail = credentials.email.toLowerCase()


        const result = await db.query(`

        INSERT INTO users (


            email, password, first_name, last_name, location, date
        )

        VALUES  ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password, first_name, last_name, location, date;
        
        
        
        `, [lowerCasedEmail, hashedPassword, credentials.first_name, credentials.last_name, credentials.location, credentials.date])


        const user = result.rows[0]


        return user





    }


    static async login(credentials){



// to let people log into the page 


const requiredFields = ["email", "password"]


requiredFields.forEach(field => {



    if (!credentials.hasOwnProperty(field)){

        throw new BadRequestError(`Missing ${field} in request body`)
    }
})


const existingUser = await User.fetchUserByEmail(credentials.email)


if (existingUser){


    const isValid = await bcrypt.compare(credentials.password, existingUser.password)


    if (isValid){

        return existingUser
    }
}






throw new UnauthorizedError("Invalid email/password combination")








    }


    static async fetchUserByEmail(email){

        if (!email){

            throw new BadRequestError("No email provided")
        }


        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])


        const user = result.rows[0]


        return user


    }

}



module.exports = User