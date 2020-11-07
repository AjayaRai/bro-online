import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Pages
import group from "./pages/group";
import login from "./pages/login";
import test from "./pages/test";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path={`/group`} component={group}/>
              <Route exact path={`/login`} component={login}/>
              <Route exact path={`/test`} component={test}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
