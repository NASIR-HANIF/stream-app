"use client"
import { redirect } from "next/navigation"
import { Button, Card, FormDesign } from "../../Tailwind/page";
import Loader from "../Loader/Loader";
import Style from "../Login/Login.module.css";
import Link from "next/link";
import signup from "./Register.action";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";


const Register = () => {

    const dispatch = useDispatch();
    const RegisterReducer = useSelector(response => response.RegisterReducer)
    const [error, setError] = useState(false)


    // inputs and labels set form design

    const fields = [
        {
            component: "input",
            props: {
                name: "name",
                type: "text",
                placeholder: "Full Name",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Full Name"
            }
        },
        {
            component: "input",
            props: {
                name: "email",
                type: "email",
                placeholder: "Email",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Email"
            }
        },
        {
            component: "input",
            props: {
                name: "password",
                type: "password",
                placeholder: "Password",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Password"
            }
        }
    ]

    useEffect(() => {
        if (RegisterReducer.success) {
            return redirect("/plans")
        }

        if (RegisterReducer.error) {
            setError(true);
            setTimeout(() => setError(false), 3000)
        }
    }, [RegisterReducer])
    const onSubmit = async (values) => {
        dispatch(signup(values))

    }

    const design = (
        <>
            <div className={`min-h-screen ${Style.main}`}>
                <div className={`min-h-screen flex items-center justify-center ${Style.opacity}`}>
                    <div className="w-3/12">

                        <Card>
                            <div className="flex flex-col gap-4">
                                {
                                    error ?
                                        <Card className="bg-red-500 text-red-500">
                                            <h1>
                                                Sign up failed. Please try again later.
                                            </h1>
                                        </Card>
                                        :
                                        null
                                }
                                <h1 className="text-2xl font-bold">Register</h1>
                                <FormDesign
                                    disabled={RegisterReducer.loading}
                                    fields={fields}
                                    onSubmit={onSubmit}
                                />
                                <Link
                                    className="text-end text-blue-500"
                                    href="/login"
                                >
                                    Visit Login Page
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
    return design
}
export default Register