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
    stopReload: false,
    searchResults:[],
    currentSearch: ''
  }
    service = new AuthService();
    componentDidMount = () => {
      let tabs = document.querySelectorAll(".tabs");
      let instance = M.Tabs.init(tabs, {});
      let photoBackgroundArr = ['/images/city-3.jpg','/images/city-header1.jpg','/images/city-header2.jpeg','/images/city-temp.jpg','/images/cityheader3.jpeg','/images/image-use.jpg'];
      let randomNum = Math.floor(Math.random() * photoBackgroundArr.length);
      let value = photoBackgroundArr[randomNum]
      document.getElementById('dashboard-header').style.backgroundImage = `url(${value})`

    }
    componentDidUpdate = () => {
        let tabs = document.querySelectorAll(".tabs");
        let instance = M.Tabs.init(tabs, {});
    }
    showResults = () =>{
      return this.state.searchResults.map((eachResult)=>{
        return <Link exact to={`/details/${eachResult.place_id}`}><h6 className='eachResult'>{eachResult.description}</h6></Link>
      })
    }
    search = (e) => {
      if(this.props.user){
      this.setState({currentSearch: e.target.value},()=>{
        axios.post(`${process.env.REACT_APP_BASE}/places/query`,{
          input: this.state.currentSearch,
          user: this.props.user
        })
        .then((response)=>{
          // console.log(response);
          this.setState({searchResults: response.data.predictions})
        })
      });
    }else{
      this.props.history.push('/account/login')
    }
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
    return (
    <div>
      <div className="row" id="dashboard-header">
      </div>
      <div className='border'></div>
        {this.props.ready &&
      <div>
      <div id='cityname-dahsboard'><h3 id='cityname-text'>{this.props.user.acquaintedCity}</h3></div>
      <div className="container content-of-dashboard">
      <div className='row'>
        <div>
          <input placeholder='Search for anything in your city' className='search-bar' onChange={this.search}/>
          {this.state.currentSearch &&
          <div className='left-align results-search'>
          {this.showResults()}
          </div>
           }
          </div>
        <div>
        {this.renderButtons()}
        {this.checker()}
        </div>
        </div>
      </div>
      </div>
        }
        {!this.props.ready &&
        <h1>Loading</h1>
        }
    </div>
    )
  }
}

export default Dashboard;
