"use client";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Button } from "../../../Tailwind/page";
import Loader from "../../Loader/Loader";
import moment from "moment";

const Jobs = () => {

    const [token, setToken] = useState("");
    const [deleteing, setDeleteing] = useState(false);

    const columns = [
        "JobId",
        "Input",
        "CreatedAt",
        "Status",
        "Percentage",
        "Actions"
    ]

    const getData = async (url) => {
        try {
            const response = await axios({
                method: "get",
                url: url
            })

            return response.data.data
        } catch (error) {
            return error.response.data
        }
    }

    const { data, error } = useSWR("/api/media-convert?token=" + token,
        getData,
        { refreshInterval: 5000 }
    );

    useEffect(() => {
        console.log(data, error)
    }, [data, error])


    const cancel = async (id) => {
        try {
            setDeleteing(true)
            const response = await axios({
                method: "delete",
                url: "/api/media-convert/" + id
            })

        } catch (error) {
            setDeleteing(false)
        }
    }

    // makeActive
const makeActive = async (id)=>{
    try {
        await axios({
            method : "patch",
            url : "/api/movies/"+id
        });
        alert("success")
    } catch (error) {
        alert("Failed")
    }
}

    const Tr = ({ item, index }) => {
        const input = item.Settings.Inputs[0].FileInput.split("/");
        const tr = (
            <>
                <tr className={`
                bg-gray-200 ${index % 2 === 0 ? "text-black" : "text-white"} 
                `}>
                    <td style={{ verticalAlign: "middle" }}>{item.Id}</td>
                    <td style={{ verticalAlign: "middle" }}>{input[input.length - 1]}</td>
                    <td style={{ verticalAlign: "middle" }}>
                        {
                             moment(item.CreatedAt).format('MMMM Do YYYY, h:mm:ss a')
                        }
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{item.Status}</td>
                    <td style={{ verticalAlign: "middle" }}>
                        {
                            item.Status === "PROGRESSING"
                                ?
                                (
                                    item.JobPercentComplete ?
                                        item.JobPercentComplete + "%"
                                        :
                                        "0%"
                                )
                                :
                                item.Status
                        }
                    </td>
                    <td>
                        {
                            item.Status === "PROGRESSING"
                                ?
                                <div className="flex">
                                    {
                                        deleteing ?
                                            <i className="fa fa-spinner fa-spin"
                                                style={{ fontSize: "30px" }}>
                                            </i>
                                            :
                                            <Button
                                                theme="error"
                                                onClick={() => cancel(item.Id)}
                                            >Cancel</Button>
                                    }
                                </div>
                                :
                                null
                        }
                        {
                            item.Status === "COMPLETE" ?
                            <Button 
                            onClick={()=>makeActive(item.Id)}
                            theme="success" >Make Active</Button>
                            : null
                        }
                    </td>
                </tr>
            </>
        );
        return tr
    }

    const design = (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-white font-bold">
                    All Jobs
                </h1>
                <Button
                    theme={data && data.NextToken ? 'error' : 'disabled'}
                    onClick={() => setToken(data.NextToken)}
                    disabled={data && data.NextToken ? false : true}
                >Next</Button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped text-white ">
                    <thead>
                        <tr>
                            {
                                columns.map((key, index) => {
                                    return <th className="text-left" key={index}>{key}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.Jobs && data.Jobs.map((item, index) => {
                                return <Tr
                                    item={item}
                                    key={index}
                                    index={index + 1}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                data || error ? null : <Loader />
            }
        </>
    );
    return design
}

export default Jobs