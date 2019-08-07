import React, { Component } from "react";
import "../useroptions/useroptions.css";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import axios from "axios";
import Moment from 'react-moment';


class Events extends Component {
  state = {
    events: null,
    stopReload: false
  };
  service = new AuthService();
  showEvents = () => {
    if (this.state.events.data.length !== 0)
      return this.state.events.data.map((eachEvent) => {
        return (
          <div>
            <div class="col s12 m4">
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content card-places">
                    <h4>{eachEvent.title}</h4>
                    <h6>At: {eachEvent.location.name}</h6>
                    <h6>By: {eachEvent.owner.name}</h6>
                    <p>
                      {eachEvent.description}
                    </p>
                      <Moment format="MM/DD/YYYY hh:mm a">{eachEvent.time}</Moment>
                     </div>
                  <div class="card-action center-align">
                    <Link
                      className="details-link"
                      events={this.state.events}
                      exact
                      to={`/eventDetails/${eachEvent._id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    else return <h1>No events yet :(</h1>;
  };
  getEvents = () => {
    if (!this.state.stopReload) {
      axios
        .get(
          `http://localhost:5000/api/events/getEvents/${this.props.user._id}`
        )
        .then(response => {
          console.log(response.data);
          this.setState({ events: response, stopReload: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    if (this.props.ready)
      return (
        <div>
          <div id="events-for-user"className="row">
            {this.getEvents()}
            {this.state.events && this.showEvents()}
          </div>
        </div>
      );
    else return <h1>Loading</h1>;
  }
}

export default Events;
