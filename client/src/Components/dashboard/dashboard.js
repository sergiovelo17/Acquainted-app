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
    eventbrite: false,
    stopReload: false,
    searchResults:[],
    currentSearch: '',
    meetuptoken: null,
    meetuprefresh: null
  }
    service = new AuthService();
    componentDidMount = () => {
      let tabs = document.querySelectorAll(".tabs");
      let instance = M.Tabs.init(tabs, {});
      let photoBackgroundArr = ['/images/city-3.jpg','/images/city-header1.jpg','/images/city-header2.jpeg','/images/city-temp.jpg','/images/cityheader3.jpeg','/images/image-use.jpg'];
      let randomNum = Math.floor(Math.random() * photoBackgroundArr.length);
      let value = photoBackgroundArr[randomNum]
      document.getElementById('dashboard-header').style.backgroundImage = `url(${value})`
      if(this.props.location.search){
        this.getToken()
        }
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
    getToken = () =>{
     console.log(this.props.location.search)
     let param = this.props.location.search;
     let token = param.substring(6);
     console.log(token);
     axios.post(`${process.env.REACT_APP_BASE}/user/meetup`,
     {
       code: token
     },{withCredentials: true})
     .then((response)=>{
       console.log(response);
       this.setState({meetuptoken: response.data.access_token, meetuprefresh: response.data.refresh_token},()=>{

       })
     })
    }
    getMeetupEvents = () =>{
      axios.post(`${process.env.REACT_APP_BASE}/user/meetup/events`,{
        token: this.state.meetuptoken
      },{
        withCredentials: true
      })
      .then((response)=>{
        console.log('hi')
        console.log(response.data.events);
        let events = response.data.events
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
          console.log(response);
          this.setState({searchResults: response.data.predictions})
        })
      });
    }else{
      this.props.history.push('/account/login')
    }
    }
    checker = (e) =>{
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
      }else if(this.state.eventbrite){
        return(
          <div>
          {!this.state.meetuptoken &&
          <div>
       <h2>Use Meetup</h2>
       <a href={`https://secure.meetup.com/oauth2/authorize?client_id=r1j6mcrdj6o3dq435ma7kejrg3&response_type=code&redirect_uri=http://localhost:3000/dashboard`}>Link Account</a>
        </div>
        }
        {this.state.meetuptoken &&
        <div>
          {this.getMeetupEvents()}
        </div>
        }
       </div>
        )
      }
    } 
    toggle = (e) => {
      if(e.target.name === 'places' && this.state.places === false){
        this.setState({places: true, events: false, eventbrite: false})
      }else if(e.target.name === 'events' && this.state.events === false){
        this.setState({places: false, events: true, eventbrite: false})
      }else if(e.target.name === 'eventbrite' && this.state.eventbrite === false){
        this.setState({places: false, events: false, eventbrite: true})
      }
    }
    renderButtons = () => {
        return(
        <ul class="tabs login-tabs">  
        <li class="tab col s4"><a name="places" className='active' onClick={this.toggle}>Places in your city</a></li>  
        <li class="tab col s4"><a name="events" onClick={this.toggle}>Events in your city</a></li>  
        <li class="tab col s4"><a name="eventbrite" onClick={this.toggle}>Eventbrite</a></li>  
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
