import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/AuthService";
import M from "materialize-css";
import './dashboard.css'
import Places from '../places/places'
import Events from '../events/events'

class Dashboard extends Component {
  state = {
    places: true,
    events: false,
    stopReload: false
  }
    service = new AuthService();
    componentDidMount = () => {
      let tabs = document.querySelectorAll(".tabs");
      let instance = M.Tabs.init(tabs, {});
    }
    componentDidUpdate = () => {
        let tabs = document.querySelectorAll(".tabs");
        let instance = M.Tabs.init(tabs, {});
    }

    checker = (e) =>{
      console.log(this.state);
      // console.log(this.props.match.params.option)
      if(this.state)
      if(!this.state.stopReload) {
        
        this.setState({stopReload: true})
  
      }
  
      if(this.state.places){
          return(
            <Places {...this.props} getUser={this.props.getUser}/>
          )
      }else if(this.state.events){
        return(
        <Events ready={this.props.ready} {...this.props} getUser={this.props.getUser}/>
        )
      }
    } 
    toggle = (e) => {
      if(e.target.name === 'places' && this.state.places === false){
        this.setState({places: true, events: false})
      }else if(e.target.name === 'events' && this.state.events === false){
        this.setState({places: false, events: true})
      }
    }
    renderButtons = () => {
        return(
        <ul class="tabs login-tabs">  
        <li class="tab col s6"><a name="places" className='active' onClick={this.toggle}>Places in your city</a></li>  
        <li class="tab col s6"><a name="events" onClick={this.toggle}>Events in your city</a></li>  
        </ul> 
        )
    }
  render() {
    if(this.props.ready)
    return (
      <div className="container">
      <div className="row">
      <div className="dashboard-header">
          <h1>{this.props.user.acquaintedCity}</h1>
        </div>
        {this.renderButtons()}
        {this.checker()}
      </div>
    </div>
    )
    else
    return <h1>Loading</h1>
  }
}

export default Dashboard;
