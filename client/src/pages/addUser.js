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
        redirectTo: "/"
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        Axios.post("/", {
            user: this.state.user,
            password: this.state.password
        })
        .then(response => {
            console.log(response)
            if (response.data) {
                console.log("Successful signup")
                this.setState({
                    redirectTo: "/login"
                })
            }
        }).catch(error => {
            console.log("Sign up error: " + error)
        })
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <h1>Sign Up Form</h1>
                        <label>Username: </label>
                        <Input
                            value={this.state.user}
                            onChange={this.handleInputChange}
                            name="user"
                            placeholder="Input your username"
                        />
                        <label>Password: </label>
                        <Input 
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            placeholder="Input your password"
                        />
                        <FormBtn
                            disabled={!(this.state.appNo && this.state.fileNo)}
                            onClick={this.handleFormSubmit}
                            style={{backgroundColor: "gray", border: "gray"}}
                        >
                            <Link to="/login"
                            style={{color: "white"}}
                            value={this.state.signedIn=true}
                            >Sign Up!</Link>
                        </FormBtn>
                    </Col>
                </Row>
            </Container>
        )}
}

export default signIn