import React, {useReducer, createContext} from 'react'
import rootReducer, {initialState, dispatchMiddleware} from "./reducer";

export const AppendPhoneContext = createContext()

const AppendPhoneProvider = (props) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const {children, ...context} = props
    return (
        <AppendPhoneContext.Provider value={{state, dispatch: dispatchMiddleware(dispatch), ...context}}>
            {children}
        </AppendPhoneContext.Provider>
    )
}
export default AppendPhoneProvider