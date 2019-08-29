import React, {Component} from 'react';
import '../useroptions/useroptions.css';
import {Route, Link, Switch} from 'react-router-dom';
import AuthService from '../../services/AuthService';

class Login extends Component {
  
    state = { 
      usernameInput: '', 
      passwordInput: '' 
    };
    service = new AuthService();

    handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
    }
    submitLogin = (e) =>{
      e.preventDefault();
      const username = this.state.usernameInput;
      const password = this.state.passwordInput;
      this.service.login(username,password)
      .then((response)=>{
        this.props.getUser()
        setTimeout(()=>{
          this.props.history.push('/')
        },700)
      })
    }

    render(){
      return(
        <div>
        <form onSubmit={this.submitLogin}>
          <legend>Username</legend>
          <input value={this.state.usernameInput} type="text" onChange={this.handleChange} name="usernameInput"></input>
          <legend>Password</legend>
          <input value={this.state.passwordInput} type="text" onChange={this.handleChange} name="passwordInput"></input>
          <div class="center-align">
          <button id="login-button" class="btn waves-effect waves-light form-button">Log in</button>
          </div>
        </form>
        </div>
      )
    }
  
}

export default Login;
