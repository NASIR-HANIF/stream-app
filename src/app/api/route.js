import { NextResponse } from "next/server"

export const GET = (request)=>{
   return NextResponse.json({message:"hello"},{status : 200})
}

export const POST =(request)=>{
    return NextResponse.json({message : "post request"},{status : 200})
}

export function DELETE(request){
return NextResponse.json({message : "delete request"},{status : 200})
}

export const PUT = (request)=>{
    return NextResponse.json({message : "put request"},{status : 200})
}