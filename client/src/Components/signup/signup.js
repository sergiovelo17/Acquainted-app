import React, {Component} from 'react';
import '../useroptions/useroptions.css';
import {Route, Link, Switch} from 'react-router-dom';
import AuthService from '../../services/AuthService';

class Signup extends Component{
  state={
    username: '',
    password: '',
    city: '',
    email: '',
    name: '',
    isAcquaintance: false
  }
  service = new AuthService();
  handleAcquaintance(e){
    if(!this.state.isAcquaintance){
      this.setState({isAcquaintance: true})
    }else{
      this.setState({isAcquaintance: false})
    }
  }
  handleChange = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  submitSignup = (e) =>{
    e.preventDefault();
    const username =this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const name = this.state.name;
    const city = this.state.city;
    const isAcquaintance = this.state.isAcquaintance;
    return this.service.signup(username,password,name,email,city,isAcquaintance)
    .then((response)=>{
      this.props.getUser();
      setTimeout(()=>{
        this.props.history.push('/dashboard')
      },700)
    })

    }
  

  render(){
    return(
      <form onSubmit={this.submitSignup}>
        <legend>Name</legend>
        <input type="text" value={this.state.name} onChange={this.handleChange} name="name"></input>
        <legend>Username</legend>
        <input type="text" value={this.state.username} onChange={this.handleChange} name="username"></input>
        <legend>Password</legend>
        <input type="text" value={this.state.password} onChange={this.handleChange} name="password"></input>
        <legend>Email</legend>
        <input type="text" value={this.state.email} onChange={this.handleChange} name="email"></input>
        <legend>City</legend>
        <input type="text" value={this.state.city} onChange={this.handleChange} name="city"></input>
        <div className="bottom-of-signup">
        <legend>Which account would you like to create?</legend>
        <div class="switch">
        <label>
        Newbie (To get acquainted)
        <input onClick={(e)=>this.handleAcquaintance(e)} type="checkbox"/>
        <span class="lever"></span>
        Acquaintance (To become a host)
        </label>
        </div>
        <div class="center-align">
        <button class="btn waves-effect waves-light form-button">Sign up!</button>
        </div>
        </div>
        </form>
    )
  }

}

export default Signup