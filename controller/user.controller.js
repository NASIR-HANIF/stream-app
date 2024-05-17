import "../module/db.module";
import userSchema from "../schema/user.schema";
import {
    decrypt,
} from "../module/bcrypt.module";
import { adminMlddleware } from "../middleware/admin.middleware";
import {SignJWT} from "jose"


export const login = async (request) => {
    const { searchParams } = new URL(request.url);
    // console.log(searchParams.get("email"))
    // console.log(searchParams.get('password'))

    const query = {};

    for (const [key, value] of searchParams) {
        query[key] = value
    }

    const userData = await userSchema.findOne({ email: query.email });

    if (userData) {

       const loginData = userData.toObject()
       delete loginData.password
       

        const login = await decrypt(query.password, userData.password)
        
        if (login) {
            const alg = "HS256";
            // ensigned integer convert unet errray
            const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);
            const token = await new SignJWT(loginData)
            .setProtectedHeader({alg : alg})
            .setExpirationTime("24h")
            .sign(secret)
            loginData.token = token
            return {
                data: {
                    user : loginData
                },
                status: 200
            }
        }else{
            return {
                data: {
                    message: "Login Failed !"
                },
                status: 401
            }
        }

    } else {
        return {
            data: {
                message: "Login Failed !"
            },
            status: 401
        }
    }

}


export const signup = async (request) => {

    try {
        const data = await request.json();
      try {
        const isAdmin = await adminMlddleware(request)
        data['role'] = "ADMIN"
      } catch (error) {
        data['role'] = 'USER'
      }
       
        const newUser = await new userSchema(data).save();
        const newData = newUser.toObject();
        delete newData.password
        return {
            data: newData,
            status: 200
        }
    } catch (error) {
       
        return {
            data: error,
            status: 424
        }
    }
}