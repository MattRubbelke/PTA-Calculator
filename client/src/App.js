import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatentApps from "./pages/PatentApps"
import AddPatent from "./pages/AddPatentApp"
import Nav from "./components/Nav/index"
import Detail from "./pages/Detail"
import './App.css';
import SignIn from './pages/SignIn';
import AddUser from "./pages/AddUser"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/addUser" component={AddUser}/>
          <Route path="/" component={PatentApps} />
          <Route exact path="/add" component={AddPatent} />
          <Route exact path="/add/:id" component={AddPatent} />
          <Route exact path="/apps/:id" component={Detail} />
          <Route exact path="/uspto" component={() => window.location = "https://www.uspto.gov"}/>
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

