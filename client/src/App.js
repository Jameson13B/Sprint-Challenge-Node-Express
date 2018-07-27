import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }
  componentWillMount() {
    axios
      .get('http://localhost:8000/projects')
      .then(response => {
        console.log('GET RESPONSE: ', response)
        this.setState({ projects: response.data })
      })
      .catch(err => {console.log(err)})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {this.state.projects.map(project => {
            return (
              <div>
                <h1>{project.name}</h1>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
