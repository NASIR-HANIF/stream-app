"use client";
import {
    Card,
    IconButton,
    Dialog,
    FormDesign
} from "../../../../Tailwind/page";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../Loader/Loader";
import { useDispatch } from "react-redux";




const fields = [
    {
        component: "input",
        props: {
            name: "_id",
            placeholder: "Starter",
            className: "bg-gray-100 rounded-sm border-0 p-3",
            type: "hidden",
        },
    },
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

const ShowPlans = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        _id : "",
        title : "",
        desc : "",
        emi : "",
        amount : ""
    })

    const getData = async (url) => {
        try {
            const response = await axios({
                method: 'get',
                url: url
            });

            return response.data.data;

        } catch (error) {
            return error.response.data;
        }
    }

    const { data, error } = useSWR(
        '/api/plan',
        getData,
        { refreshInterval: 5000 }
    );

    useEffect(() => {
        console.log(data, error)
    }, [data, error]);



    // edit dialog open function
    const edit = async (item) => {
        dispatch({
            type: 'OPEN_DIALOG'
        })
        setFormData(item)
    }

// edit request function

    const update = async(values,{resetForm})=>{
        const {_id} = values;
      const response = await axios({
            method : "put",
            url : "/api/plan/"+_id,
            data : values
        });
        resetForm();
        dispatch({
            type : 'CLOSE_DIALOG'
        })
    }

    // delete function
    const trash = async (id) => {
        await axios({
            method: 'delete',
            url: '/api/plan/' + id
        });
    }
    const AllPlans = ({ item }) => {
        const plan = (
            <>
                <Card>
                    <h1 className="text-2xl font-bold">{item.title}</h1>
                    <p className="text-gray-400">
                        {item.desc}
                    </p>
                    <div className="flex flex-col gap-3 my-2">
                        <h1 className="text-6xl font-bold">{item.amount}</h1>
                        <p>{item.emi}/Emi</p>
                    </div>
                    <div className="flex gap-4">
                        <IconButton onClick={() => edit(item)} theme="secondary">edit</IconButton>
                        <IconButton onClick={() => trash(item._id)} theme="error">delete</IconButton>
                    </div>
                </Card>
            </>
        );
        return plan
    }

    const design = (
        <>
            <div className="grid sm:grid-cols-3 gap-4">

                {
                    data === undefined ? <Loader /> : null
                }
                {
                    data && data.map((item, index) => {
                        return <AllPlans item={item} key={index} />
                    })
                }
                <Dialog title="Edit & Save">
                    <FormDesign
                    fields={fields} 
                    formData={formData} 
                    btnType="edit" 
                    onSubmit={update}
                    />
                </Dialog>
            </div>
        </>
    );
    return design;
};

export default ShowPlans;
