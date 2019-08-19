import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import axios from "axios";
import M from "materialize-css";
import "./createevent.css";

class CreateEvent extends Component {
  state = {
    title: '',
    time: '',
    description: '',
    location: ''
  };
  service = new AuthService();
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {})
  };
  createEvent = e => {
    e.preventDefault();
    const time = this.state.time;
    const title = this.state.title;
    const location = this.state.location;
    const description = this.state.description;
    axios.post(`${process.env.REACT_APP_BASE}/events/createEvent`,{
    time: time,
    title: title,
    location: location,
    description: description
    },{withCredentials: true})
    .then((response)=>{
      this.props.updateUser(response)
    })
  };
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  showLocationOptions = () => {
    return this.props.user.favoritePlaces.map((eachFavorite)=>{
      return(
        <option value={eachFavorite.name}>{eachFavorite.name}</option>
      )
    })
  }
  render() {
    return (
      <div>
        <div id="createEventModal" class="modal">
          <div class="modal-content">
            <h4>Create Event</h4>
            <form onSubmit={this.createEvent}>
              <legend>Title</legend>
              <input type="text" onChange={this.handleChange} name="title"/>
              <legend>Location</legend>
              <select onChange={this.handleChange} name='location'>
                <option value="" disabled selected>
                  Choose your Location
                </option>
               {this.showLocationOptions()}
              </select>
              <legend>Date & Time</legend>
              <input onChange={this.handleChange} type="datetime-local" name="time" />
              <legend>Description</legend>
              <input onChange={this.handleChange} type="text" name="description" />
              <button id='eventBtn' class="modal-close waves-effect submit-changes btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
