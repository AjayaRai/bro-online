import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Pages
import group from "./pages/group";



function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path={`/group`} component={group}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
