import {APPEND_PHONES, DB_UPDATED} from "../constants/actions"

export const appendPhones = nameList => ({type: APPEND_PHONES, payload: nameList})
export const dbUpdating = name => ({type: DB_UPDATED, payload: name})
export const dbUpdated = name => ({type: DB_UPDATED, payload: name})
