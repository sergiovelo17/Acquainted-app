import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./profile.css";
import M from "materialize-css";
import axios from "axios";
import Moment from "react-moment";


class Profile extends Component {
  state = {
    stopReload: false,
    userForProfile: null,
    acquaintance: false,
    favorites: true,
    upcomingEvents: false,
    pastEvents: false,
    username: "",
    city: "",
    email: "",
    name: "",
    lat: null,
    lng: null,
  };
  service = new AuthService();
  componentDidMount = () => {
    let tabs = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(tabs, {});
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  };
  componentDidUpdate = () => {
    let tabs = document.querySelectorAll(".tabs");
    let instance = M.Tabs.init(tabs, {});
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  };

  
  toggle = e => {
    if (e.target.name === "favorites" && this.state.favorites === false) {
      this.setState({
        favorites: true,
        upcomingEvents: false,
        pastEvents: false
      });
    } else if (
      e.target.name === "upcomingEvents" &&
      this.state.upcomingEvents === false
    ) {
      this.setState({
        favorites: false,
        upcomingEvents: true,
        pastEvents: false
      });
    } else if (
      e.target.name === "pastEvents" &&
      this.state.pastEvents === false
    ) {
      this.setState({
        favorites: false,
        upcomingEvents: false,
        pastEvents: true
      });
    }
  };
  displayInfo = () => {
    if (this.state.favorites) {
      if (!this.state.userForProfile.favoritePlaces.length > 0) {
        return <h2>No favorites yet :( Start exploring!</h2>;
      } else {
        return this.state.userForProfile.favoritePlaces.map(eachPlace => {
          return (
            <div className="col s12 m6 l4">
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content card-favorites">
                    <h4>{eachPlace.name}</h4>
                    <h6>{eachPlace.address}</h6>
                    <h6>
                      Rating: {eachPlace.rating}/5
                    </h6>
                  </div>
                  <div class="card-action center-align">
                    <Link
                      className="details-link"
                      exact
                      to={`/details/${eachPlace.placeId}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
    } else if (this.state.upcomingEvents) {
      if (!this.state.userForProfile.upcomingEvents.length > 0) {
        return <h2>No upcoming events yet :( Attend some!</h2>;
      } else {
        return this.state.userForProfile.upcomingEvents.map(eachEvent => {
          return (
            <div className="col s12 m6 l4">
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content card-favorites">
                    <h4>{eachEvent.title}</h4>
                    <h6>At {eachEvent.location.name}</h6>
                    <Moment format="MM/DD/YYYY hh:mm a">
                      {eachEvent.time}
                    </Moment>
                    <h6>{eachEvent.description}</h6>
                  </div>
                  <div class="card-action center-align">
                    <Link
                      className="details-link"
                      exact
                      to={`/eventDetails/${eachEvent._id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
    } else if (this.state.pastEvents) {
      if (!this.state.userForProfile.pastEvents.length > 0) {
        return <h2>No past events yet :( Attend some!</h2>;
      } else {
        return this.state.userForProfile.pastEvents.map(eachEvent => {
          return (
            <div className="col s12 m6 l4">
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content card-favorites">
                    <h4>{eachEvent.title}</h4>
                    <Moment format="MM/DD/YYYY hh:mm a">
                      {eachEvent.time}
                    </Moment>
                    <h6>{eachEvent.description}</h6>
                  </div>
                  <div class="card-action center-align">
                    <Link
                      className="details-link"
                      exact
                      to={`/eventDetails/${eachEvent._id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
    }
  };
  profileTabs = () => {
    return (
      <ul className="tabs profile-tabs">
        <li class="tab col s4">
          <a name="favorites" className="active" onClick={this.toggle}>
            Favorite Places
          </a>
        </li>
        <li class="tab col s4">
          <a name="upcomingEvents" onClick={this.toggle}>
            Upcoming Events
          </a>
        </li>
        <li class="tab col s4">
          <a name="pastEvents" onClick={this.toggle}>
            Past Events
          </a>
        </li>
      </ul>
    );
  };
  getProfileInfo = () => {
   
  };
  showInfo = () => {
    console.log(this.state.userForProfile);
    return (
      <div>
        <div className="container-fluid">
          <div className="row profile-header">
            <div className="all-profile-info">
              {!this.state.acquaintance && (
                <h1>{this.state.userForProfile.name}</h1>
                )}
              {this.state.acquaintance && (
                <div className="acquaintance-box">
                  <h1>{this.state.userForProfile.name}</h1>
                  <img
                    className="acquaintance-logo"
                    src="/images/acquaintance-certified.png"
                  />
                </div>
              )}
              <div className="image-info-map">
                <img
                  className="profile-img"
                  src={this.state.userForProfile.profileImg}
                />
                <div className="user-info-under-name left-align">
                  <h6>{this.state.userForProfile.profileDescription}</h6>
                  <h5>@{this.state.userForProfile.username}</h5>
                  <h5>
                    Acquainted city: {this.state.userForProfile.acquaintedCity}
                  </h5>
                </div>
              </div>
              {/* <GoogleMap user={this.props.user} lat={this.state.lat} lng={this.state.lng}/> */}
            </div>
          </div>
          </div>
          <div className='container'>
          <div className="row profile-tabs">
            {this.profileTabs()}
            {this.displayInfo()}
          </div>
        </div>
      </div>
    );
  };
  render() {
    if (this.props.ready) {
      return (
        <div>
          {this.getProfileInfo()}
          {this.state.userForProfile && this.showInfo()}
        </div>
      );
    } else return <h1>Loading</h1>;
  }
}

export default Profile;
