"use client";
import {
    Card,
    Button,
    Rupee
} from "../../Tailwind/page";
//  import useRazorpay from "react-razorpay";
import { nanoid } from "nanoid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"


const Plans = () => {

    // const [Razorpay] = useRazorpay();

    const router = useRouter();
    const [data, setData] = useState(null)
    const { data: session } = useSession();



    // fetch plans
    const getdata = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/plan`);
            if (!response.ok) {
                throw new Error("Failed to fetch data !");
            }
            // return await response.json();
            const mdata = await response.json();
            setData(mdata)
        } catch (error) {
            return error
        }
    };

    useEffect(() => {
        getdata();

    }, [])


    const colors = [
        {
            backgroundColor: "#FA8BFF",
            backgroundImage: `linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)`,
            color: "white"
        },
        {
            backgroundColor: "#FFE53B",
            backgroundImage: `linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)`,
            color: "white"
        },
        {
            backgroundColor: "#21D4FD",
            backgroundImage: `linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)`,
            color: "white"
        },

    ];

    // purchase entery function 
    const purchaseEntry = async (data) => {
        try {
            const response = await axios({
                method: "post",
                url: "/api/purchase",
                data: data
            })
            console.log(response.data.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    const purchase = async (item) => {
        if (!session) {
            return router.push("/login")
        }
        const order = await axios({
            method: "post",
            url: "/api/razorpay/order",
            data: {
                amount: item.amount
            }
        });

        const { id } = order.data.data;
        console.log("orderid= " + id)

        /*
        const options = {
            key: process.env.NEXT_PUBLIC_RAZOR_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: item.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Stream pk",
            description: item.title.toUpperCase() + " PLAN",
            image: "/logo.jpg",
            order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                purchaseEntry({
                    email: session.user.email,
                    planId: item._id,
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature
                })

            },
            prefill: {
                name: session.user.name,
                email: session.user.email,

            },

            theme: {
                color: "#3399cc",
            },
        };

        const razor = new Razorpay(options);

        razor.open();

*/
        // -------------------------------------------
        // fake payment response data send purchaseEntry
        const razorpay_payment_id = nanoid(10);
        const razorpay_order_id = nanoid(12);
        const razorpay_signature = nanoid(14);
        purchaseEntry({
            email: session.user.email,
            planId: item._id,
            paymentId: `pay_${razorpay_payment_id}`,
            orderId: `order_${razorpay_order_id}`,
            signature: razorpay_signature
        })


    }

    // show all plans compunent
    const AllPlans = ({ item, index }) => {
        const plan = (
            <>
                <Card className="relative text-center shadow-lg rounded-lg border p-4">
                    <h1 className="mt-16 text-6xl font-bold">
                        <i className="fa fa-rupee"></i>
                        {item.amount}
                    </h1>
                    <p className="capitalize text-gray-400 text-xl">
                        {item.emi}
                    </p>
                    <div className="my-5" style={{ borderBottom: "1px dashed" }}> </div>
                    <pre style={{
                        fontFamily: "verdana",
                        lineHeight: "40px",
                        color: "#444"
                    }}>
                        {item.desc}
                    </pre>
                    <Button
                        style={{
                            background: "red",
                            color: "white",
                            ...colors[index]
                        }}
                        className="my-5 rounded-lg"
                        theme="secondary"
                        onClick={() => purchase(item)}
                    >
                        BUY NOW
                    </Button>
                    <div
                        className="text-2xl font-bold uppercase"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translate(-50% ,0)",
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                            padding: "10px 40px",
                            background: "red",
                            color: "white",
                            ...colors[index]
                        }}>
                        {item.title}
                    </div>
                </Card>
            </>
        )
        return plan
    }

    const design = (
        <>
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 p-8 sm:p-16">
                {
                    data && data.data.map((item, index) => {
                        return (
                            <AllPlans
                                item={item}
                                key={index}
                                index={index}
                            />
                        )
                    })
                }
            </div>
        </>
    );
    return design;
}

export default Plans;
