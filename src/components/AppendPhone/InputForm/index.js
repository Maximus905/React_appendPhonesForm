import React, {useState, useContext, useEffect} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {AppendPhoneContext} from '../AppendPhoneProvider'
import {requestData, appendPhones, updateDb} from "../actions";

const InputForm = (props) => {
    const [phoneList, setPhoneList] = useState('')
    const {state, dispatch} = useContext(AppendPhoneContext)
    useEffect(() => {
        state.forEach(item => {
            const {name, didInvalidate, isLoading} = item
            if (didInvalidate && ! isLoading) dispatch(requestData(name))
        })
    }, [state, dispatch])

    useEffect(() => {
        state.forEach(item => {
            const {didInvalidate, isLoading, dbUpdating, dbUpdated, errors, successful, ...phoneInfo} = item
            if (!didInvalidate && !isLoading && !dbUpdating && !dbUpdated) dispatch(updateDb(item.name, phoneInfo))
        })
    })

    const isLoadingStatus = () => {
        let isLoading = false
        for (const item of state) {
            if (item.isLoading) {
                isLoading = true
                break
            }
        }
        return isLoading
    }
    const hInputOnChange = (e) => {
        setPhoneList(e.target.value.toUpperCase())
    }
    const hButtonOnClick = () => {
        const nameList = phoneList.replace(/[\n\r]/g, ',').split(',').map(item => item.trim()).filter(item => item.length > 0)
        dispatch(appendPhones(nameList))
    }
    return (
         <Form>
             <FormGroup>
                 <Label className={'font-weight-bold'} for='phoneNames'>Список имен телефонов через запятую</Label>
                 <Input type='textarea' placeholder='Имена телефонов через запятую' onChange={hInputOnChange} value={phoneList} />
             </FormGroup>
             <FormGroup>
                 <Button color={'primary'} size={'sm'} onClick={hButtonOnClick} disabled={isLoadingStatus()}>Опросить</Button>
             </FormGroup>
         </Form>
    )
}

export default InputForm