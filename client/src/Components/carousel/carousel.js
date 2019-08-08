import React, { Component } from "react";
import "./carousel.css";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import M from "materialize-css";
import { Carousel } from "react-responsive-carousel";

class Caro extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img
            src='/images/city2/.jpg'
            alt="no photo available"
          />
        </div>
        <div>
          <img
            src='/images/city-3/.jpg'
            alt="no photo available"
          />
        </div>
        <div>
          <img
            src='/images/city-4/.jpg'
            alt="no photo available"
          />
        </div>
      </Carousel>
    );
  }
}
export default Caro;
