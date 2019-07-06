import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import API from "../utils/API";
import USPTOAPI from "../utils/USPTOAPI"
import moment from "moment"
import datetimeDifference from "datetime-difference";

class Detail extends Component {
  state = {
    _id: null,
    fileNo: "",
    appNo: "",
    PTA: 0,
    uspto: {},
    ADelay: {}
  };

  // When this component mounts, grab the application with the _id of this.props.match.params.id
  // This should happen when the user clicks on the designated row. 
  componentDidMount() {
    API.getApp(this.props.match.params.id)
      .then(res => this.setState({ ...res.data }))
      .then(() => this.loadPatentDetails())
      .catch(err => console.log(err));
  };

  loadPatentDetails() {
    USPTOAPI.getPatentData(this.state.appNo)
    .then(res => {
      if (!res.data.response.docs[1]) {
        this.setState({ uspto: res.data.response.docs[0]})
        console.log(this.state.uspto)
      }
      else{
        this.setState({ uspto: res.data.response.docs[1]})
        console.log(this.state.uspto)
      }
    })
    .then(() => this.calculateADelay())
  };

  calculateADelay(){
    const dateFiled = moment(this.state.uspto.applicationDate).format("L")
    const dateGranted = moment(this.state.uspto.publicationDate).format("L")
    console.log(dateFiled)
    console.log(dateGranted) 
    const date1 = new Date(dateFiled)
    const date2 = new Date(dateGranted)
    console.log(date1, date2)
    const result = datetimeDifference(date1, date2)
    console.log(result)
    this.setState({ ADelay: result })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1 style={{marginTop: "20px"}}>
                File Number: {this.state.fileNo}
              </h1>
              <h1>
                Application Number: {this.state.appNo}
              </h1>
              <h1>PTA Days: {this.state.PTA}</h1>
              <hr style={{height: "5px"}} />
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
              <h3>Additional Details</h3>
              {this.state.uspto.patentNumber ? (
              <ul>
                <li>Title: {this.state.uspto.title}</li>
                <li>Date Filed: {moment(this.state.uspto.applicationDate).format('LL')}</li>
                <li>Inventor(s): {this.state.uspto.inventor}</li>
                <li>Applicant(s): {this.state.uspto.applicant}</li>
                <li>Assignee(s): {this.state.uspto.assignee}</li>
                <li>Patent Number: {this.state.uspto.patentNumber}</li>
                <li>Date Granted: {moment(this.state.uspto.publicationDate).format('LL')}</li>
                <li>A Delays: {this.state.ADelay.years} years, {this.state.ADelay.months} months, and {this.state.ADelay.days} days</li>
              </ul>
              ) :(
              <ul>
                <li>Title: {this.state.uspto.title}</li>
                <li>Date Filed: {moment(this.state.uspto.applicationDate).format('LL')}</li>
                <li>Inventor(s): {this.state.uspto.inventor}</li>
                <li>Applicant(s): {this.state.uspto.applicant}</li>
                <li>Assignee(s): {this.state.uspto.assignee}</li>
                <li>Patent Number: This application has not been granted yet.</li>
                <li>Date Granted: This application has not been granted yet.</li>
              </ul>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Link to="/">Back to Dashboard</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
