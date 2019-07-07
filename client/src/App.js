import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/index";
import Apps from "./pages/Apps";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Sign from './pages/Sign';
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/login" component={Sign} />
          <Route exact path="/addUser" component={Register}/>
          <Route exact path="/" component={Apps} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/add/:id" component={Add} />
          <Route exact path="/apps/:id" component={Detail} />
          <Route exact path="/uspto" component={() => window.location = "https://www.uspto.gov"}/>
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

