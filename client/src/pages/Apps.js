import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Outline/Outline";
import Dashboard from "../components/Dashboard/Dashboard";
import { List, Table, Header, ListItem} from "../components/List/List";

class Apps extends Component {
  state = {
    applications: [],
    users: {},
    currentUser: {},
    signedIn: true
  };

  componentDidMount() {
    this.loadApps();
    this.loadUserProfile()

  }

  loadUserProfile(){
    API.getUser()
    .then(res => {
      this.setState({ users: res.data})
      for (let i=0; i < this.state.users.length; i++){
        if (this.state.users[i].loggedIn === true){
          this.setState({currentUser: this.state.users[i]})
          console.log(this.state.currentUser)
        }
      }
      if (!this.state.currentUser.user){
        this.props.history.push("/login")
      }
    })
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

  logout = () => {
    this.setState(prevState => {
      let currentUser = {...prevState.currentUser}
      currentUser.loggedIn = false
      API.updateUser(currentUser._id, currentUser)
      console.log(this.state.users)
      this.props.history.push("/login")
      return {currentUser}
    })

  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Dashboard user={this.state.currentUser.user} />
            <Col size="md-3">
            <Link to="/add"><button className="btn btn-success" style={{width: "200px"}}>Add a Patent!</button></Link>
            <br/>
            <br/>
            <a target="blank" href="/uspto"><button className="btn btn-primary" style={{width: "200px"}}>USPTO Site</button></a>
            <br/>
            <br/>
            <button className="btn" 
            style={{width: "200px", color: "white", backgroundColor: "gray", marginBottom: "20px"}}
            onClick={this.logout}
            >Logout</button>
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
