import React, {Component} from 'react';
import './App.css';
import Nav from './Components/navbars/nav'
import {Route, Link, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from './Components/login/login'
import AuthService from './services/AuthService.js';
import Signup from './Components/signup/signup';
import LandingPage from './Components/homepage/homepage'
import UserOptions from './Components/useroptions/useroptions';
import Dashboard from './Components/dashboard/dashboard';
import Details from './Components/details/details.js';
import EventDetails from './Components/eventdetails/eventdetails';
import Profile from './Components/profile/profile'
class App extends Component {
  state = {
    userLoggedIn: null,
    ready: false
  }
  service = new AuthService();
  
  
  getCurrentlyLoggedInUser = () =>{
    this.service.currentUser()
    .then((theUser)=>{
      console.log(theUser)
      this.setState({userLoggedIn: theUser, ready: true})
    })
    .catch(()=>{
      this.setState({userLoggedIn: null})
    })
  }
  logout = (e) =>{
    e.preventDefault();
    this.service.logout()
    .then((response)=>{
      console.log(response)
      this.props.history.push('/')
      this.setState({userLoggedIn: null})
    })
    .catch((err)=>{
      console.log(err);
    })
  }
    
  componentDidMount() {
    this.getCurrentlyLoggedInUser();
  }
  
  render(){
  return (
    <div className="App">
     <Nav logout={this.logout} ready={this.state.ready} user={this.state.userLoggedIn} />
     <Switch>
     <Route exact path="/" render ={(props)=> <LandingPage
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           ready={this.state.ready}
           />} />
      <Route exact path="/profile" render ={(props)=> <Profile
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           ready={this.state.ready}
           user = {this.state.userLoggedIn}
           />} />
      <Route exact path="/account/:option" render ={(props)=> <UserOptions
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           ready={this.state.ready}
           />} />
      <Route exact path="/dashboard" render ={(props)=> <Dashboard
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           user = {this.state.userLoggedIn}
           ready={this.state.ready}
           />} />
      <Route exact path="/details/:id" render ={(props)=> <Details
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           user = {this.state.userLoggedIn}
           ready={this.state.ready}
           />} />
     <Route exact path="/eventDetails/:id" render ={(props)=> <EventDetails
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           user = {this.state.userLoggedIn}
           ready={this.state.ready}
           />} />
      <Route exact path="/profile" render ={(props)=> <Profile
           {...props} 
           getUser={this.getCurrentlyLoggedInUser}
           user = {this.state.userLoggedIn}
           ready={this.state.ready}
           />} />
     </Switch>
    </div>
  );
}
}

export default App;
