import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import API from "../utils/API";

class Detail extends Component {
  state = {
    app: {}
  };
  // When this component mounts, grab the application with the _id of this.props.match.params.id
  // This should happen when the user clicks on the designated row. 
  componentDidMount() {
    API.getApp(this.props.match.params.id)
      .then(res => this.setState({ app: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1>
                File Number: {this.state.app.fileNo}
              </h1>
              <h1>
                Application Number: {this.state.app.appNo}
              </h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>PTA Days: {this.state.app.PTA}</h1>
              <p>
                In detail!
              </p>
            </article>
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
