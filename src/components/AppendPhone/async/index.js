import axios from 'axios'
import {APPEND_PHONE_URL, UPDATE_PHONE_URL} from "../constants/urls";

const errorHandler = (error) => {
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log('error.response', error.response.data);
        console.log('error.response', error.response.status);
        console.log('error.response', error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log('error.request', error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('error.message', error.message);
    }
    console.log('error general', error)
}

export async function appendPhoneInfo(name) {
    try {
        const response = await axios.get(APPEND_PHONE_URL, {
            params: {name}
        })
        return response.data.result
    } catch (error) {
        errorHandler(error)
    }
}
export async function updatePhoneInfo(data) {
    try {
        const response = await axios.post(UPDATE_PHONE_URL, {phoneData: JSON.stringify(data)})
        return response.data.result
    } catch (error) {
        errorHandler(error)
    }
}