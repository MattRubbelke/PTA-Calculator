import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form/Form";

class addUser extends Component {
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
        console.log("Saving user...")
        event.preventDefault();
        if (this.state.user && this.state.password) {
            API.saveUser({
                user: this.state.user,
                password: this.state.password
            })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log("Successful signup")
                    .then(()=> this.props.history.push("/login"))
                }
            }).catch(error => {
                console.log("Sign up error: " + error)
            })
        }
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div style={{width: "60%", margin: "20px auto"}}>
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
                            disabled={!(this.state.user && this.state.password)}
                            onClick={this.handleFormSubmit}
                            style={{backgroundColor: "gray", border: "gray"}}

                        >
                            Sign Up
                        </FormBtn>
                    </div>
                    </Col>
                </Row>
            </Container>
        )}
}

export default addUser