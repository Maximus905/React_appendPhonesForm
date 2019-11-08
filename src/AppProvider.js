import React, {createContext, useReducer} from 'react'
import rootReducer, {initialState} from './reducer'

export const AppContext = createContext()

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const {children, ...context} = props
    return (
        <AppContext.Provider value={{state, dispatch, ...context}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider