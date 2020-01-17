import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Projects from "./Components/Projects";
import Actions from "./Components/Actions";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Create React App for Node API Sprint Challenge!</h1>
     
      <Router>
      <Link to="/projects"><button>View Projects</button></Link>
      <Link to="/actions"><button>View Actions</button></Link>
      <Route path="/projects" component={Projects}/>
      <Route path="/actions" component={Actions}/>
      <Route />
      </Router>
    </div>
  );
}

export default App;
