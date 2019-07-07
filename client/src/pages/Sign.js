import React, { Component } from "react";
import { Col, Row, Container } from "../components/Outline/Outline";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form/Form";
import bcrypt from "bcryptjs"

class Sign extends Component {
    state = {
        users: {},
        user: "",
        password: "",
        currentUser: {},
        validationStyle: "none",
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
        API.getUser()
        .then(res => {
            this.setState({ users: res.data })
            for (let i = 0; i < this.state.users.length; i++){
                if (this.state.users[i].user === this.state.user){
                    this.setState(prevState => {
                        let currentUser = {...prevState.users[i]}
                        currentUser.loggedIn = true;
                        API.updateUser(currentUser._id, currentUser)
                        this.setState({currentUser: currentUser})
                    bcrypt.compare(this.state.password, this.state.currentUser.password, function(err, res) {
                        let currentUser = {...prevState.users[i]}
                        currentUser.loggedIn = true;
                        API.updateUser(currentUser._id, currentUser)
                        return {currentUser}
                    })
                    this.props.history.push("/")
                    });
                    
                }
            }
            if (!this.state.currentUser.user){
                this.setState({validationStyle: "block"})
            }
        })
        .catch(error => {
            console.log("login error: "+ error)
        })
    }

    handleSignUp = event => {
        event.preventDefault();
        this.props.history.push("/addUser")
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
                            type="password"
                        />
                        <FormBtn
                            disabled={!(this.state.user && this.state.password)}
                            onClick={this.handleFormSubmit}
                            style={{backgroundColor: "gray", border: "gray", margin: "0 auto"}}
                        >
                            Login
                        </FormBtn>
                        <FormBtn
                            onClick={this.handleSignUp}
                            style={{backgroundColor: "gray", marginLeft: "20px", border: "gray"}}
                        >
                        Sign Up!
                        </FormBtn>
                        <div 
                        style={{display: this.state.validationStyle, backgroundColor: "red", borderRadius: "15px", color: "white", textAlign: "center", marginTop: "20px"}}> 
                        Your username and/or password did not match. Please try again.
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )}
}

export default Sign