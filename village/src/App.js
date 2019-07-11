import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Link, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({ smurfs: response.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

 updateState = (smurfs) => {
    this.setState({ smurfs })

  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/'>Home</Link>
          <Link to='smurf-form'>Smurf Form</Link>
        </nav>
        {/* <SmurfForm /> */}
        <Route exact path='/' render={(props) => {
          return (
            <div>
              <Smurfs smurfs={this.state.smurfs} />

            </div>
          )
        }} />
        <Route exact path='/smurf-form' render={(props) => {
          return (
            <div>
              <SmurfForm {...props} updateState={this.updateState}/>
            </div>

          )

        }} />

      </div>
    );
  }
}

export default App;
