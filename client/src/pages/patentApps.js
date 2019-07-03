import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import Dashboard from "../components/Dashboard/Dashboard";
import { List, Table, Header, ListItem} from "../components/List/List";

class Apps extends Component {
  state = {
    applications: [],
    signedIn: true
  };

  componentDidMount() {
    this.loadApps();
  }

  loadApps = () => {
    API.getApps()
      .then(res =>
        this.setState({ applications: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteApp = id => {
    API.deleteApp(id)
      .then(res => this.loadApps())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Dashboard />
            <Col size="md-3">
            <Link to="/add"><button className="btn btn-success" style={{width: "200px"}}>Add a Patent!</button></Link>
            <br/>
            <br/>
            <a target="blank" href="www.uspto.gov"><button className="btn btn-primary" style={{width: "200px"}}>USPTO Site</button></a>
            <br/>
            <br/>
            <Link to="/login"><button className="btn" style={{width: "200px", color: "white", backgroundColor: "gray", marginBottom: "20px"}}>Logout</button></Link>
            </Col>
            <Row>
            <Col size="md-12">
            {this.state.applications.length ? (
              <List>
                <Table>
                  <Header/>
                {this.state.applications.map(application => (
                  <ListItem key={application._id} application={application} delete={this.deleteApp}/>
                ))}
                </Table>
              </List>
            ) : (
              <h3>No Applications to Display</h3>
            )}
            </Col>
            </Row>
        </Row>
      </Container>
    );
  }
}

export default Apps;
