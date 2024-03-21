import axios from "axios";
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from "./Register.state"

const signup = (data) => {
    console.log(data)
    return async (dispatch) => {
        try {
            dispatch({
                type: SIGNUP_REQUEST,
            });
            const response = await axios({
                method: "post",
                url: "/api/user",
                data: data
            });
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.data
            })

        } catch (error) {
            dispatch({
                type: SIGNUP_FAILED,
                payload: error.response.data
            })
        }

    }
}

export default signup