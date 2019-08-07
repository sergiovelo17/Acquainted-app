import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import Login from "../login/login";
import AuthService from "../../services/AuthService";
import Signup from "../signup/signup";
import M from "materialize-css";
import '../dashboard/dashboard.css'

class Places extends Component {
  state = {};
  service = new AuthService();

  loadCity = (category) => {
    let collection = category;
    return this.props.user.cityPlaces[collection].results.map((e)=>{
      let types = '';
      e.types.forEach((each)=>{
        types += each + ', '
      })
      let typesOfPlace = types.substr(0,types.length-2);
    return(
    <div class="col s12">
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content card-places">
          <h5>{e.name}</h5>
          <p>{e.vicinity}</p>
          <p>Rating: {e.rating} | ({e.user_ratings_total} reviews)</p>
          <p>Categories: {typesOfPlace}</p>
        </div>
        <div class="card-action center-align">
          <Link className='details-link' exact to={`/details/${e.place_id}`}>Details</Link>
        </div>
      </div>
    </div>
  </div>
    )
  })
  }
  render() {
    if(this.props.ready)
    return (
      <div>
          <div className="row">
            <div className="col s12 m5 offset-m1 categories">
            <h2>Restaurants</h2>
            {this.loadCity('restaurants')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Lodging</h2>
            {this.loadCity('lodging')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Health</h2>
            {this.loadCity('doctors')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Bars</h2>
            {this.loadCity('bars')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Leisure</h2>
            {this.loadCity('leisure')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Government</h2>
            {this.loadCity('government')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Fitness</h2>
            {this.loadCity('gym')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Shopping</h2>
            {this.loadCity('shopping')}
            </div>
            <div className="col s12 m5 offset-m1 categories">
            <h2>Banks</h2>
            {this.loadCity('banks')}
            </div>
          </div>
        </div>
    );
    else
    return <h1>Loading</h1>
  }
}

export default Places;
