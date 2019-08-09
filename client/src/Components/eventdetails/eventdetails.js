import React, { Component } from "react";
import "../useroptions/useroptions.css";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Details from '../details/details'
import axios from "axios";
import '../details/details.css';
import './eventdetails.css'
import Moment from 'react-moment';
import M from 'materialize-css';
import EditEvent from '../editEvent/editEvent'
import DeleteEvent from '../deleteevent/deleteevent'

class EventDetails extends Component {
  state = {
    eventdetails: null,
    stopReload: false,
    attending: false,
    acquaintance: true,
    listOfAttendees: false,
    discussion: false,
    message: '',
    isOwner: false,
    updatedLocation: false,
  }
  service = new AuthService();
  
  componentDidMount = () => {
    let tabs = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(tabs, {});
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  }
  componentDidUpdate = () => {
    let tabs = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(tabs, {});
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  }
  attend = () => {
    this.props.getUser();
    if(this.props.user){
    console.log(this.state.eventdetails._id)
    axios.post(`${process.env.REACT_APP_BASE}/events/attendEvent`,{eventId: this.state.eventdetails._id, attending: this.state.attending},{
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
  if(this.state.eventdetails.discussion.participants){
  return this.state.eventdetails.discussion.participants.map((each)=>{
    return(
      <div className='user-participants left-align'>
      <Link exact to={`/userProfile/${each._id}`}>@{each.username}</Link>
      </div>
    )
  })
  }
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
      <div className='chat-container'>
      <div className='chat-info-reverse'>
      <i><p className='user-message-name'>By: {eachMessage.createdBy.username}</p></i>
      <Moment format="MM/DD/YYYY">{eachMessage.createdAt}</Moment>
      </div>
      <div className='chat-content-reverse'>
      <img className='chat-image' src={eachMessage.createdBy.profileImg}></img>
      <p className='other-user-message-content'>{eachMessage.body}</p>
      </div>
       {/* <Moment fromNow>{eachMessage.createdAt}</Moment> */}
      </div>
    )
    }else{
      return(
      <div className='chat-container'>
      <div className='chat-info valign-center'>
      <i><p className='user-message-name'>By: {eachMessage.createdBy.username}</p></i>
      <Moment format="MM/DD/YYYY">{eachMessage.createdAt}</Moment>
      </div>
      <div className='chat-content'>
      <img className='chat-image' src={eachMessage.createdBy.profileImg}></img>
      <p className='other-user-message-content'>{eachMessage.body}</p>
      </div>
      {/* <i><p className='user-message-name'>{eachMessage.createdBy.username}</p></i>
      <div className='chat-container'>
      <div className='other-user-message'>
      <div className='content-message-container'>
       <p className='other-user-message-content'>{eachMessage.body}</p>
       </div>
       </div>
       </div>
       <Moment format="MM/DD/YYYY">{eachMessage.createdAt}</Moment> */}
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
  axios.post(`${process.env.REACT_APP_BASE}/events/postToForum/${this.state.eventdetails._id}`,{
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
        <h4>Name: {this.state.eventdetails.owner.name}  <Link exact to={`/userProfile/${this.state.eventdetails.owner._id}`}>(@{this.state.eventdetails.owner.username})</Link></h4>
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
redirect = () =>{
  console.log('attempted redirect')
  this.props.history.push('/profile')
}
renderLocation = (bypass) => {
  if(this.state.updatedLocation){
    console.log(bypass)
  return(
  <Details getUser={this.props.getUser} user={this.props.user} ready={this.props.ready} placeDetailsId={bypass.data.location.placeId}/>
  )
  }else{
    return(
      <Details getUser={this.props.getUser} user={this.props.user} ready={this.props.ready} placeDetailsId={this.state.eventdetails.location.placeId}/>
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
    <div className="eventButtons">
    {!this.state.attending &&
    <button className="btn waves-effect waves-light attendButton" onClick={this.attend}>Attend Event</button>
    }
    {this.state.attending &&
    <button className="btn waves-effect waves-light attendingButton" onClick={this.attend}>Attending</button>
    }
    {this.state.isOwner &&
      <a class="waves-effect waves-light btn modal-trigger attendButton" href="#editEventModal">Edit Event</a>
    }
   {this.state.isOwner &&
       <a className="btn waves-effect waves-light modal-trigger attendButton" href='#deleteEventModal'>Cancel Event</a>
      }
    </div>
      <EditEvent updateLocation={this.renderLocation} updateUser={this.getEventDetails} user={this.props.user} eventdetails={this.state.eventdetails}/>
      <DeleteEvent redirect={this.redirect} updateLocation={this.renderLocation} updateUser={this.getEventDetails} user={this.props.user} eventdetails={this.state.eventdetails}/>
    </div>
    </div>
    <div className='row'>
    {this.eventOptions()}
    {this.clickedInfo()}
    </div>
    </div>
    <h4>Location Details</h4>
    {/* {this.renderLocation()} */}
    </div>
    )
  }
  getEventDetails = (bypass) => {
    if(!this.state.stopReload || bypass !== undefined){
    if(bypass){
      this.setState({updatedLocation: true})
    }
    this.props.getUser();
    if(this.props.user){
    axios.post(`${process.env.REACT_APP_BASE}/events/getSingleEvent/${this.props.match.params.id}`,{user_id: this.props.user._id},{withCredentials: true})
    .then((response)=>{
      console.log('------------',response)
      if(response.data.attending === true){
        if(response.data.event.owner._id === this.props.user._id){
      this.setState({eventdetails: response.data.event, stopReload: true, attending: true, isOwner: true})
      }else{
        this.setState({eventdetails: response.data.event, stopReload: true, attending: true})
      }
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
            {/* {this.state.eventdetails && this.state.updatedLocation &&
           <Details getUser={this.props.getUser} readyToUpdate={true} user={this.props.user} ready={this.props.ready} placeDetailsId={this.state.eventdetails.location.placeId}/>
            } */}
            {this.state.eventdetails &&
           <Details getUser={this.props.getUser} user={this.props.user} ready={this.props.ready} placeDetailsId={this.state.eventdetails.location.placeId}/>
            }
          </div>
        </div>
      );
    else return <h1>Loading</h1>;
  }
}

export default EventDetails;
