import {
    JOB_REQUEST,
    JOB_SUCCESS,
    JOB_FAILED,
    MOVIES_REQUEST,
    MOVIES_SUCCESS,
    MOVIES_FAILED
} from "../Movies/Movies.state";
import axios from "axios";


export const createJob = (data) => {
    
    return async (dispatch) => {
        try {

            dispatch({
                type: JOB_REQUEST
            })

            const response = await axios({
                method: "post",
                url: "/api/media-convert",
                data : {
                    key : data.video
                }
            });

            console.log(response)
            data.job_id = response.data.data.Job.Id;
            console.log(data)
            dispatch({
                type: JOB_SUCCESS,
                payload: {
                    data,
                    jobData : response.data.data
                }
            });
                // dispatch createmovie 
            dispatch(createMovie(data))
        } catch (error) {
            dispatch({
                type: JOB_FAILED,
                payload: error.response
            })
        }
    }
}


const createMovie = (data)=>{

    return async (dispatch)=>{
        try {

            dispatch({
                type : MOVIES_REQUEST,

            })

            const response = await axios({
                method : "post",
                url : "/api/movies",
                data : data
            })

            dispatch({
                type : MOVIES_SUCCESS,
                payload : response.data.data
            })


            
        } catch (error) {
            dispatch({
                type : MOVIES_FAILED,
                payload : error.message
            })
        }
    }

}