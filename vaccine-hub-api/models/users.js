

const { BadRequestError } = require("../utils/errors")

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


        const lowerCasedEmail = credentials.email.toLowerCase()


        const result = await db.query(`

        INSERT INTO users (


            email, password, first_name, last_name, location, date
        )

        VALUES  ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password, first_name, last_name, location, date;
        
        
        
        `, [lowerCasedEmail, credentials.password, credentials.first_name, credentials.last_name, credentials.location, credentials.date])


        const user = result.rows[0]


        return user





    }


    static login(){



// to let people log into the page 







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