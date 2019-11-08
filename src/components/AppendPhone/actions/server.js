import {
    LOADING_DATA,
    REQUEST_DATA,
    RECEIVE_DATA,
    UPDATE_DB
} from "../constants/actions"

export const loadingData = (name) => ({type: LOADING_DATA, payload: name})
/**
 *
 * @param {string} name
 * @return {{payload: string, type: string}}
 */
export const requestData = (name) => ({type: REQUEST_DATA, payload: name})
/**
 *
 * @param {string} name
 * @param {Object} data
 * @param errors
 * @param {boolean} successful
 * @return {{payload: Object, type: string}}
 */
export const receiveData = (name, data, errors, successful) => {
    const {name: nameFromSrv, ...phoneProps} = data

   return {type: RECEIVE_DATA, payload: {...phoneProps, name, nameFromSrv, errors, successful}}
}

export const updateDb = (name, phoneInfo) => ({type: UPDATE_DB, payload: {name, phoneInfo}})