// ADD YOUR IMPORTS
import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline"
import { Input, TextArea, FormBtn } from "../components/Form/Form";

class AddPatentApp extends Component {
    state = {
        _id: null,
        fileNo: "",
        appNo: "",
        PTA: 0
    };

    componentDidMount(){
        API.getApp(this.props.match.params.id)
        .then(res => {
            console.log(res)
            this.setState({ ...res.data })
        })

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
        if (this.state._id){
            API.updateApp(this.state._id, {
                fileNo: this.state.fileNo,
                appNo: this.state.appNo,
                PTA: this.state.PTA
        })
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err));
        }
        else if (this.state.appNo && this.state.fileNo) {
        API.saveApp({
            fileNo: this.state.fileNo,
            appNo: this.state.appNo,
            PTA: this.state.PTA
        })
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err));
        }
    }


    render() {
        console.log(this.props)
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
                    name="fileNo"
                />
                <label>Input the Application Number</label>
                <Input
                    value={this.state.app.appNo}
                    onChange={this.handleInputChange}
                    name="appNo"
                />
                <label>Input the number of days allotted, due to Patent Term Adjustment Number</label>
                <Input
                    value={this.state.app.PTA}
                    onChange={this.handleInputChange}
                    name="PTA"
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
            >
                Submit Application
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

export default AddPatentApp