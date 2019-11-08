import {appendPhoneInfo, updatePhoneInfo} from '../async'
import {
    APPEND_PHONES,
    LOADING_DATA,
    REQUEST_DATA,
    RECEIVE_DATA,
    UPDATE_DB,
    DB_UPDATED,
    DB_UPDATING
} from "../constants/actions";
import {loadingData, receiveData, dbUpdating, dbUpdated} from '../actions'
import check from 'check-types'

export const initialStatePhoneData = {
    isLoading: false,
    didInvalidate: true,
    dbUpdating: false,
    dbUpdated: false
}
/**
 *
 * @type {Object}
 */
export const initialState = []

export function dispatchMiddleware(dispatch) {
    /**
     * @param {function} dispatch
     * @param {string} name
     * @return {Promise<*>}
     */
    async function appendPhoneData(dispatch, name) {
        dispatch(loadingData(name))
        try {
            const response = await appendPhoneInfo(name)
            const {data, errors} = response
            const successful = check.emptyArray(errors) && check.nonEmptyObject(data)
            return dispatch(receiveData(name, data, errors, successful))
        } catch (e) {
            console.log('Error fetching data from server', e)
            return dispatch(receiveData(name, {}, ['Error fetching data from server'], false))
        }
    }
    /**
     * @param {function} dispatch
     * @param {string} name
     * @param {Object} phoneInfo
     * @return {Promise<*>}
     */
    async function updatePhoneData(dispatch, {name, phoneInfo}) {
        dispatch(dbUpdating(name))
        try {
            const response = await updatePhoneInfo(phoneInfo)
            const {success, error} = response
            if (success) {
                return dispatch(dbUpdated(name))
            }
            if (check.nonEmptyArray(error)) {
                console.log('error updating DB', error)
            }
        } catch (e) {
            console.log('Error update data on server', e)
            // return dispatch(receiveData(name, {}, ['Error fetching data from server'], false))
        }
    }
    return (action) => {
        const {type, payload} = action
        switch (type) {
            case REQUEST_DATA:
                return appendPhoneData(dispatch, payload)
            case UPDATE_DB:
                return updatePhoneData(dispatch, payload)
            default:
                return dispatch(action)
        }
    }
}

/**
 *
 * @param {Array} state
 * @param {{type: string, payload: Object}} action
 * @return {{state: Array}|{isLoading: boolean, data: *, didInvalidate: boolean}|*}
 */
const rootReducer = (state, action) => {
    const {payload, type} = action
    const {name, ...phoneProps} = payload
    switch (type) {
        case APPEND_PHONES:
            // return state.concat(payload.map(name => ({name, ...initialStatePhoneData})))
            return payload.map(name => ({name, ...initialStatePhoneData}))
        case LOADING_DATA:
            return state.map(item => {
                    return item.name === name ? item : {...item, isLoading: true}
                })
        case RECEIVE_DATA:
            return state.map(item => {
                return item.name !== name ? item : {name, ...phoneProps,  isLoading: false, didInvalidate: false}
            })
        case DB_UPDATING:
            return state.map(item => {
                return item.name !== payload ? item : {...item,  dbUpdating: true}
            })
        case DB_UPDATED:
            return state.map(item => {
                return item.name !== payload ? item : {...item, dbUpdating: false,  dbUpdated: true}
            })
        default:
            return state
    }
}
export default rootReducer