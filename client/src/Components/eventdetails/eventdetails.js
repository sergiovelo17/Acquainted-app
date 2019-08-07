import React, { Component } from "react";
import "../useroptions/useroptions.css";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Details from '../details/details'
import axios from "axios";
import '../details/details.css';
import './eventdetails.css'
import Moment from 'react-moment';
import M from 'materialize-css';

class EventDetails extends Component {
  state = {
    eventdetails: null,
    stopReload: false,
    attending: false,
    acquaintance: true,
    listOfAttendees: false,
    discussion: false,
    message: ''
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
  attend = () => {
    this.props.getUser();
    if(this.props.user){
    console.log(this.state.eventdetails._id)
    axios.post(`http://localhost:5000/api/events/attendEvent`,{eventId: this.state.eventdetails._id, attending: this.state.attending},{
      withCredentials: true
    })
    .then((response)=>{
      console.log(response);
      this.props.getUser();
      this.setState({attending: !this.state.attending, eventdetails: response.data})
    })
  }else{
    this.props.history.push('/');
    return;
  }
}
showParticipants = () => {
  console.log(this.state.eventdetails.discussion)
  return this.state.eventdetails.discussion.participants.map((each)=>{
    return(
      <div className='user-participants left-align'>
      <Link exact to=''>@{each.username}</Link>
      </div>
    )
  })
}
toggle = (e) =>{
    if(e.target.name === 'acquaintance' && this.state.acquaintance === false){
      this.setState({acquaintance: true, listOfAttendees: false, discussion: false})
    }else if(e.target.name === 'listOfAttendees' && this.state.listOfAttendees === false){
      this.setState({acquaintance: false, listOfAttendees: true, discussion: false})
    }else if(e.target.name === 'discussion' && this.state.discussion === false){
      this.setState({acquaintance: false, listOfAttendees: false, discussion: true})
    }
}
eventOptions = () =>{
    return(
    <ul class="tabs event-tabs">  
    <li class="tab col s4"><a name="acquaintance" className='active' onClick={this.toggle}>Acquaintance</a></li>  
    <li class="tab col s4"><a name="listOfAttendees" onClick={this.toggle}>Attendees</a></li>  
    <li class="tab col s4"><a name="discussion" onClick={this.toggle}>Discussion</a></li>  
    </ul> 
    )
}
showMessages = () => {
  if(this.state.eventdetails.discussion.messages.length > 0){
  return this.state.eventdetails.discussion.messages.map((eachMessage)=>{
    if(eachMessage.createdBy._id === this.props.user._id){
    return(
      <div className='right-align'>
      <p className='user-message-name'>Me</p>
      <div className='user-chat-container'>
      <div className='user-message'>
      <div className='content-message-container'>
       <p className='user-message-content'>{eachMessage.body}</p>
       </div>
       </div>
       </div>
      </div>
    )
    }else{
      return(
      <div className='left-align'>
      <p className='user-message-name'>{eachMessage.createdBy.username}</p>
      <div className='chat-container'>
      <div className='other-user-message'>
      <div className='content-message-container'>
       <p className='other-user-message-content'>{eachMessage.body}</p>
       </div>
       </div>
       </div>
      </div>
      )
    }
  })
  }else{
    return(<h3>No messages yet, post something!</h3>)
  }
}
handleMessage = (e) => {
  this.setState({message: e.target.value})
}
sendMessage = (e) => {
  e.preventDefault();
  axios.post(`http://localhost:5000/api/events/postToForum/${this.state.eventdetails._id}`,{
  message: this.state.message
  },{withCredentials: true})
  .then((response)=>{
    console.log(response);
    this.setState({message: '', eventdetails: response.data})
  })
}
clickedInfo = () => {
  if(this.state.acquaintance){
    return(
      <div>
        <img className="acquaintance-img" src={this.state.eventdetails.owner.profileImg}/>
        <h4>Name: {this.state.eventdetails.owner.name} (@{this.state.eventdetails.owner.username})</h4>
        <h5>From: {this.state.eventdetails.owner.acquaintedCity}</h5>
      </div>
    )
}else if(this.state.listOfAttendees){
  if(this.state.eventdetails.attendees[0]){
    return this.state.eventdetails.attendees.map((eachAttendee)=>{
      return(
        <div className="left-align">
        <h6> - {eachAttendee.name} (@{eachAttendee.username})</h6>
        </div>
      )
    })
  }else{
    return(<h1>Nobody is attending yet!</h1>)
  }
}else if(this.state.discussion){
  return(
    <div className='col s12 message-box'>
      <div className='left-align col s12 m3'>
        <h5>Participants</h5>
      {this.showParticipants()}
      </div>
      <div className='col s12 m9' id='chat-box'>
        {this.showMessages()}
        <form className='message-input-and-button' onSubmit={this.sendMessage}>
        <input value={this.state.message} type='text' name='message' onChange={this.handleMessage}/>
        <button className='messageButton'>Send</button>
        </form>
      </div>
    </div>
    )
  }
}
  showEventDetails = () => {
    console.log('working')
    return(
    <div>
    <div className="container">
    <div className="row">
    <div className="event-details valign-center">
    <h2>{this.state.eventdetails.title}</h2>
    <Moment format="MM/DD/YYYY hh:mm a">{this.state.eventdetails.time}</Moment>
    <p>Event details: {this.state.eventdetails.description}</p>
    {!this.state.attending &&
    <button className="btn waves-effect waves-light attendButton" onClick={this.attend}>Attend Event</button>
    }
    {this.state.attending &&
    <button className="btn waves-effect waves-light attendingButton" onClick={this.attend}>Attending</button>
    }
    </div>
    </div>
    <div className='row'>
    {this.eventOptions()}
    {this.clickedInfo()}
    </div>
    </div>
    <h4>Location Details</h4>
    <Details getUser={this.props.getUser} user={this.props.user} ready={this.props.ready} placeDetailsId={this.state.eventdetails.location.placeId}/>
    </div>
    )
  }
  getEventDetails = () => {
    if(!this.state.stopReload){
    this.props.getUser();
    if(this.props.user){
    axios.post(`http://localhost:5000/api/events/getSingleEvent/${this.props.match.params.id}`,{user_id: this.props.user._id},{withCredentials: true})
    .then((response)=>{
      console.log('------------',response)
      if(response.data.attending === true){
      this.setState({eventdetails: response.data.event, stopReload: true, attending: true})
      }else{
        this.setState({eventdetails: response.data.event, stopReload: true})
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }else{
    this.props.history.push('/account/login');
  }
  }
  }
  render() {
    if (this.props.ready)
      return (
        <div>
          <div id="events-for-user"className="row">
            {this.getEventDetails()}
            {this.state.eventdetails && 
            this.showEventDetails()
            }
          </div>
        </div>
      );
    else return <h1>Loading</h1>;
  }
}

export default EventDetails;
