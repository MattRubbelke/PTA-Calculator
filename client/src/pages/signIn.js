import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form/Form";
import Axios from "axios";
 

class signIn extends Component {
    state = {
        user: "",
        password: "",
        loggedIn: false
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getUser("/users/login", {
            user: this.state.user,
            password: this.state.password
        })
        .then(response => {
            console.log("login response: " + response)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: true,
                    user: response.data.user
                })
            }
        })
        this.setState({
            redirectTo:"/"
        }).catch(error => {
            console.log("login error: "+ error)
        })
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div style={{width: "60%", margin: "20px auto"}}>
                        <h1>Login</h1>
                        <label>Username: </label>
                        <Input
                            value={this.state.user}
                            onChange={this.handleInputChange}
                            name="user"
                            placeholder="Input your username"
                            style={{margin: "0 auto"}}
                        />
                        <label style={{margin: "auto"}}>Password: </label>
                        <Input 
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            placeholder="Input your password"
                            style={{margin: "0 auto"}}
                        />
                        <FormBtn
                            disabled={!(this.state.appNo && this.state.fileNo)}
                            onClick={this.handleFormSubmit}
                            style={{backgroundColor: "gray", border: "gray", margin: "0 auto"}}
                        >
                            Login
                        </FormBtn>
                        <FormBtn
                            disabled={!(this.state.appNo && this.state.fileNo)}
                            onClick={this.handleFormSubmit}
                            style={{backgroundColor: "gray", marginLeft: "20px", border: "gray"}}
                        >
                            <Link style={{color: "white"}} to="/addUser"
                            >Sign Up!</Link>
                        </FormBtn>
                        </div>
                    </Col>
                </Row>
            </Container>
        )}
}

export default signIn