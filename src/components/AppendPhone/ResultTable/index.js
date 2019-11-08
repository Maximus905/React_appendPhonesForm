import React, {useContext} from 'react'
import {Table} from 'reactstrap'
import {AppendPhoneContext} from "../AppendPhoneProvider";
import check from 'check-types'

const ResultTable = () => {
    const {state} = useContext(AppendPhoneContext)
    const loadingMessage = 'loading...'
    const dataRows = () => {
        return state.map((item, index) => {
            const {name, status, serialNumber, inventoryNumber, isLoading, errors, dbUpdated} = item
            if (check.nonEmptyArray(errors)) {
                return (
                    <tr key={name}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td colSpan={3}>{errors.join(', ')}</td>
                    </tr>
                )
            }
            return (
                <tr key={name}>
                    <td>{index + 1}</td>
                    <td>{name} {dbUpdated ? <small style={{opacity: 0.7}}>обновлено в БД</small> : ''}</td>
                    <td>{isLoading ? loadingMessage : status}</td>
                    <td>{isLoading ? loadingMessage : inventoryNumber}</td>
                    <td>{isLoading ? loadingMessage : serialNumber}</td>
                </tr>
                )
            }
        )
    }
    return (
        <Table bordered={true} hover={true} striped={true} size={'sm'} dark={true}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Phone Name</th>
                    <th>Status</th>
                    <th>Inventory Number</th>
                    <th>SerialNumber</th>
                </tr>
            </thead>
            <tbody>
            {dataRows()}
            </tbody>
        </Table>
    )
}
export default ResultTable