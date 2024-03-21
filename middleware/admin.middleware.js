import { jwtVerify } from "jose"

export const adminMlddleware = (request) => {
    return new Promise(async (resolve, reject) => {
        const token = request.cookies.get("admin")
        if (!token) {
            return reject(false)
        }

        try {
            // text encode algorethem
            const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);
            await jwtVerify(token.value, secret);
            return resolve(true)
        } catch (error) {
            return reject(false)
        }
    })
}
