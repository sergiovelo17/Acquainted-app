import React, {Component} from 'react';
import '../../App.css';
import {Route, Link, Switch} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Carousel from '../carousel/carousel'
class Hompage extends Component {
  
    state = { 
      usernameInput: '', 
      passwordInput: '' 
    };
    service = new AuthService();

    render(){
      return(
        <div>
          <Carousel/>
        </div>
      )
    }
  
}

export default Hompage;
