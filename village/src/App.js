import React, { Component } from 'react';
import Axios from 'axios';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    Axios.get('http://localhost:3333/smurfs')
    .then(response => {
      console.log(response)
      this.setState({smurfs: response.data})
    })
    .catch(error => {
      console.log(error)
    })
  }
  postSmurf = (newSmurf) => {
    Axios.post('http://localhost:3333/smurfs', newSmurf)
    .then(response => {
      let newSmurfsList = this.state.smurfs;
      newSmurfsList.push(newSmurf)
      this.setState({smurfs: newSmurfsList})
    })
    .catch(error => {
      console.log(error);
    })
  }
  deleteSmurf = (id) => {
    Axios.delete(`http://localhost:3333/smurfs/${id}`)
    .then( response => {
      console.log('It Worked')
      this.setState({smurfs: response.data})
    })
    .catch( err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <NavLink className="link" exact to="/" activeClassName="activeNavButton">Smurf Village</NavLink>
          <NavLink className="link" exact to="/smurf-form" activeClassName="activeNavButton">Add to Village</NavLink>
        </div>
        <Route exact path="/smurf-form" render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />}/>
        <Route path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />} />
      </div>
    );
  }
}

export default App;
