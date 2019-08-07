import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import axios from 'axios';
import Login from '../login/login'
import AuthService from '../../services/AuthService';
import Signup from '../signup/signup';
import M from "materialize-css";
import './useroptions.css'

class UserOptions extends Component {
  state = {
    signup: false,
    login: false,
    stopReload: false
  }
  service = new AuthService();
 
  checker = (e) =>{
    console.log(this.state);
    let value = this.props.match.params.option;
    // console.log(this.props.match.params.option)
    if(this.state)
    if(!this.state.stopReload) {
      
      this.setState({[value]: true, stopReload: true},()=>{console.log(this.state)})

    }

    if(this.state.login){
        return(
          <Login {...this.props} getUser={this.props.getUser}/>
        )
    }else if(this.state.signup){
      return(
      <Signup {...this.props} getUser={this.props.getUser}/>
      )
    }
  }
  componentDidMount = () => {
    let tabs = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(tabs, {});
  }
  toggle = (e) => {
    if(e.target.name === 'login' && this.state.login == false){
      this.setState({login: true, signup: false})
    }else if(e.target.name === 'signup' && this.state.signup == false){
      this.setState({login: false, signup: true})
    }
  }
  renderButtons = () => {
    if(this.props.match.params.option === 'login'){
      return(
      <ul class="tabs login-tabs">  
      <li class="tab col s6"><a name="login" className='active' onClick={this.toggle}>Log in</a></li>  
      <li class="tab col s6"><a name="signup" onClick={this.toggle}>Sign up</a></li>  
      </ul> 
      )
    }else{
      return(
      <ul class="tabs login-tabs">  
      <li class="tab col s6"><a name="login" onClick={this.toggle}>Log in</a></li>  
      <li class="tab col s6"><a name="signup" className='active' onClick={this.toggle}>Sign up</a></li>  
      </ul> 
      )
    }
  }
  
  render(){
  return (
    <div className="container">
      <div className="row">
        <div className="user-form-body">
          <div className="row form-content">
        {this.renderButtons()}
        {this.checker()}
        </div>
        </div>
      </div>
    </div>
  );
}
}

export default UserOptions;
