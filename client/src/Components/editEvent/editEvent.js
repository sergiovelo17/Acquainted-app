import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import axios from "axios";
import M from "materialize-css";
import './editEvent.css'
import Moment from 'react-moment';

class EditEvent extends Component {
  state = {
    title: this.props.eventdetails.title,
    description: this.props.eventdetails.description,
    time: this.props.eventdetails.time,
    location: this.props.eventdetails.location.name,
  };
  service = new AuthService();
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {})
  };
 
  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value})
  };
  showLocationOptions = () => {
    return this.props.user.favoritePlaces.map((eachFavorite)=>{
      return(
        <option value={eachFavorite.name}>{eachFavorite.name}</option>
      )
    })
  }
  submitEditForm = e => {
    console.log('hi')
    e.preventDefault()
    const title = this.state.title;
    const description = this.state.description;
    const location = this.state.location;
    const time = this.state.time;
    axios
      .post(`${process.env.REACT_APP_BASE}/events/editEvent/${this.props.eventdetails._id}`,
        {
          title: title,
          description: description,
          location: location,
          time: time,
        },
        { withCredentials: true }
      )
      .then(response => {
        this.props.updateUser(response);
      });
  };
  render() {
    let string = this.state.time.substring(0,this.state.time.length-1)
    return (
      <div>
        <div id="editEventModal" class="modal">
        <div class="modal-content">
            <h4>Create Event</h4>
            <form onSubmit={this.submitEditForm}>
              <legend>Title</legend>
              <input type="text" onChange={this.handleChange} value={this.state.title} name="title"/>
              <legend>Location</legend>
              <select onChange={this.handleChange} name='location'>
                <option value={this.state.location} disabled selected>
                  {this.state.location}
                </option>
               {this.showLocationOptions()}
              </select>
              <legend>Date & Time</legend>
              <legend>Current time:  <Moment format="MM/DD/YYYY hh:mm a">{this.state.time}</Moment></legend>
              <input onChange={this.handleChange} type="datetime-local" name="time" />
              <legend>Description</legend>
              <input value={this.state.description} onChange={this.handleChange} type="text" name="description" />
              <button class="modal-close waves-effect submit-changes btn">
                Submit
              </button>
            </form>
          </div>
        </div>
        </div>
    );
  }
}

export default EditEvent;
