const loginMiddleware = (request)=>{
    return new Promise((resolve,reject)=>{
        const {value} = request.cookies.get("token")
       
        if(value === "1234567890"){
            resolve("Login success")
        }else{
            reject("token not valid")
        }
    })
}
export default loginMiddleware