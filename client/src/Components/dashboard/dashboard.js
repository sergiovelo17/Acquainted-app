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
    meetup: false,
    stopReload: false,
    searchResults:[],
    currentSearch: '',
    meetuptoken: null,
    meetuprefresh: null,
    meetupEvents: null,
    loadedMeetup: false
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
    showMeetup = () =>{
      return this.state.meetupEvents.map((each)=>{
        return (
          <div class="col s12 m6 l4">
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content card-places">
                <h5>{each.name}</h5>
                {each.venue &&
                <h6>At: {each.venue.name}</h6>
                }
                {each.group &&
                <h6>By: {each.group.name}</h6>
              }
                  <p>On: {each.local_date}</p>
                 </div>
              <div class="card-action center-align">
                {/* <Link
                  className="details-link"
                  events={this.state.events}
                  exact
                  to={`/eventDetails/${eachEvent._id}`}
                >
                  Details
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        )
      })
    }
    getMeetupEvents = () =>{
      if(!this.state.loadedMeetup){
      axios.post(`${process.env.REACT_APP_BASE}/user/meetup/events`,{
        token: this.state.meetuptoken
      },{
        withCredentials: true
      })
      .then((response)=>{
        console.log('hi')
        console.log(response.data.events);
        let theEvents = response.data.events
        this.setState({meetupEvents: theEvents, loadedMeetup: true});
      })
    }
    }
    search = (e) => {
      if(this.props.user){
      this.setState({currentSearch: e.target.value},()=>{
        axios.post(`${process.env.REACT_APP_BASE}/places/query`,{
          input: this.state.currentSearch,
          user: this.props.user
        })
        .then((response)=>{
          console.log(response,'done');
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
      }else if(this.state.meetup){
        return(
          <div>
          {!this.state.meetuptoken &&
          <div className='meetup-logo'>
       <img className='meetup' src='/images/meetuplogo.png'/>
       <a className='valign-center' href={`https://secure.meetup.com/oauth2/authorize?client_id=5usaaofq5tdlgp8t8os5s1eups&response_type=code&redirect_uri=https://acquainted-app.herokuapp.com/dashboard`}>Link Account</a>
        </div>
        }
        {this.state.meetuptoken &&
        <div>
          {this.getMeetupEvents()}
          {this.state.meetupEvents &&
          this.showMeetup()
          }
          </div>
        }
       </div>
        )
      }
    } 
    toggle = (e) => {
      if(e.target.name === 'places' && this.state.places === false){
        this.setState({places: true, events: false, meetup: false})
      }else if(e.target.name === 'events' && this.state.events === false){
        this.setState({places: false, events: true, meetup: false})
      }else if(e.target.name === 'meetup' && this.state.meetup === false){
        this.setState({places: false, events: false, meetup: true})
      }
    }
    renderButtons = () => {
        return(
        <ul class="tabs login-tabs">  
        <li class="tab col s4"><a name="places" className='active' onClick={this.toggle}>Places in your city</a></li>  
        <li class="tab col s4"><a name="events" onClick={this.toggle}>Events in your city</a></li>  
        <li class="tab col s4"><a name="meetup" onClick={this.toggle}>Meetup</a></li>  
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
