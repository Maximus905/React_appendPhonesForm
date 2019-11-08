import React from 'react'
import {Container, Row, Col, } from 'reactstrap'
import InputForm from "./InputForm"
import AppendPhoneProvider from "./AppendPhoneProvider";
import ResultTable from './ResultTable'

const AppendPhone = (props) => {
    return (
        <AppendPhoneProvider {...props}>
            <Container fluid={true}  style={{backgroundColor: 'AntiqueWhite', height: '100vh'}}>
                <Row>
                    <Col xs={6}>
                        <InputForm/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ResultTable/>
                    </Col>
                </Row>
            </Container>
        </AppendPhoneProvider>
    )
}
export default AppendPhone