import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import axios from "axios";
import M from "materialize-css";
import './deleteevent.css'

class DeleteEvent extends Component {
 
  service = new AuthService();
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  };
 
  confirmDelete = () => {
    axios
    .post(`${process.env.REACT_APP_BASE}/events/deleteEvent/${this.props.eventdetails._id}`,
      {},
      { withCredentials: true }
    )
    .then(response => {
      // console.log(this.props)
      this.props.redirect()
    });  
  };

  render() {
    return (
      <div>
       <div id="deleteEventModal" class="modal">
        <div class="modal-content">
          <h3 id='delete-event-form'>Are you sure you would like to delete this event?</h3>
          <div className='buttons-container-delete'>
            <button className='btn waves-effect waves-light modal-close delete-buttons'>No</button>
            <button onClick={this.confirmDelete} className='btn waves-effect modal-close waves-light delete-buttons'>Yes</button>
          </div>
          </div>
        </div>
        </div>
    );
  }
}

export default DeleteEvent;
