 // import Razorpay from "razorpay";
import { nanoid } from "nanoid";


// const razor = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZOR_KEY_ID,
//     key_secret: process.env.NEXT_PUBLIC_RAZOR_KEY_SECRET
// })

export const createOrder = async (request) => {
    try {
        const id = nanoid(14);
        const { amount } = await request.json();
        // const order = await razor.orders.create({
        //     amount: (amount*100),
        //     currency: "INR",
        //     receipt: id
        // })

        // genrate fake id

        const genratefakeId = {
                    id : `order_${id}`,
                    amount : amount  
        } 

        return {
            // data: order,
             data: genratefakeId,
            status: 200
        }
    } catch (error) {
        return {
            data: error,
            status: 424
        }
    }
}


export const fetchAllOrder = async (request) => {
//   const orders = await razor.orders.all()
//     return {
//         data: orders,
//         status: 200
//     }
}