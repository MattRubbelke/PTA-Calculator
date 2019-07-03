// ADD YOUR IMPORTS
import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline"
import { Input, TextArea, FormBtn } from "../components/Form/Form";

class addPatentApp extends Component {
    state = {
        app:{},
        fileNo: "",
        appNo: "",
        PTA: 0
    };

    componentDidMount(){
        API.getApp(this.props.match.params.id)
        .then(res => this.setState({ app: res.data }))
        .catch(err => console.log(err))
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };


    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.appNo && this.state.fileNo) {
        API.saveApp({
            fileNo: this.state.fileNo,
            appNo: this.state.appNo,
            PTA: this.state.PTA
        })
            .then(res => this.loadApps())
            .catch(err => console.log(err));
        } 
        else if (this.state.app.fileNo && this.state.appNo){
            API.saveApp({
                fileNo: this.state.app.fileNo,
                appNo: this.state.app.appNo,
                PTA: this.state.app.PTA
            })
                .then(res => this.loadApps())
                .catch(err => console.log(err))
        }
            
    }


    render() {
        return(
        <Container fluid>
        <Row>
        <Col size="md-12">
            {this.state.app ? (
                <form style={{marginTop: "30px"}}>
                <label>Input the File Number</label>
                <Input
                    value={this.state.app.fileNo}
                    onChange={this.handleInputChange}
                    name="app.fileNo"
                />
                <label>Input the Application Number</label>
                <Input
                    value={this.state.app.appNo}
                    onChange={this.handleInputChange}
                    name="app.appNo"
                />
                <label>Input the number of days allotted, due to Patent Term Adjustment Number</label>
                <Input
                    value={this.state.app.PTA}
                    onChange={this.handleInputChange}
                    name="app.PTA"
                />
                <Link to="/" style={{color: "white"}}>
                <FormBtn
                    disabled={!(this.state.app.fileNo && this.state.app.appNo)}
                    onClick={this.handleFormSubmit}
                    style={{backgroundColor: "green", marginBottom: "10px"}}
                >
                    Update Application
                </FormBtn>
                </Link>
                </form>
            ):(
            <form style={{marginTop: "30px"}}>
            <label>Input the File Number</label>
            <Input
                value={this.state.fileNo}
                onChange={this.handleInputChange}
                name="fileNo"
                placeholder="File Number (required)"
            />
            <label>Input the Application Number</label>
            <Input
                value={this.state.appNo}
                onChange={this.handleInputChange}
                name="appNo"
                placeholder="Application Number (required)"
            />
            <label>Input the number of days allotted, due to Patent Term Adjustment Number</label>
            <Input
                value={this.state.PTA}
                onChange={this.handleInputChange}
                name="PTA"
                placeholder="Patent Term Adjustment (Optional)"
            />
            <FormBtn
                disabled={!(this.state.appNo && this.state.fileNo)}
                onClick={this.handleFormSubmit}
                style={{backgroundColor: "green", marginBottom: "10px"}}
            ><Link to="/" style={{color: "white"}}>
                Submit Application
                </Link>
            </FormBtn>
            </form>
            )}
        </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Link to="/">Back to Dashboard</Link>
          </Col>
        </Row>
        </Container>
            )
        };
}

export default addPatentApp