"use client";
import { Card, FormDesign } from "../../../../Tailwind/page";
import { create } from "../plans.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const fields = [
    {
        component: "input",
        props: {
            name: "title",
            placeholder: "Starter",
            className: "bg-gray-100 rounded-sm border-0 p-3",
            label: "Plan Name",
        },
    },
    {
        component: "input",
        props: {
            name: "emi",
            placeholder: "monthly",
            className: "bg-gray-100 rounded-sm border-0 p-3",
            label: "Emi Name",
        },
    },
    {
        component: "input",
        props: {
            name: "amount",
            type: "number",
            placeholder: "20000",
            className: "bg-gray-100 rounded-sm border-0 p-3",
            label: "Amount",
        },
    },
    {
        component: "input",
        props: {
            name: "desc",
            placeholder: "Description",
            textarea: true,
            className: "bg-gray-100 rounded-sm border-0 p-3",
            label: "Description",
        },
    },
];

const CreatePlans = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();
    const plansReducer = useSelector((response) => response.plansReducer);

    useEffect(() => {
        if (plansReducer.createLoading) {
            setDisabled(true);
        }

        if (plansReducer.createSuccess) {
            setDisabled(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }

        if (plansReducer.createError) {
            setDisabled(false);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    }, [plansReducer]);

    const onSubmit = (values, { resetForm }) => {
        dispatch(create(values, resetForm));
    };

    const design = (
        <>
            <Card>
                {success ? (
                    <Card className="mb-3 bg-red-500 text-green-500">
                        <h1>Create Plan success. Please create another plan.</h1>
                    </Card>
                ) : null}

                {error ? (
                    <Card className="mb-3 bg-red-500 text-red-500">
                        <h1>Create Plan failed. Please try again later.</h1>
                    </Card>
                ) : null}
                <FormDesign fields={fields} onSubmit={onSubmit} disabled={disabled} />
            </Card>
        </>
    );
    return design;
};
export default CreatePlans;
