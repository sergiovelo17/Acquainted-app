import React, { Component } from "react";
import "./homepage.css";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Carousel } from "react-responsive-carousel";
class Hompage extends Component {
  state = {
    usernameInput: "",
    passwordInput: ""
  };
  service = new AuthService();

  render() {
    return (
      <div className="container-fluid center-align">
        <div id="homepage-header" className="row" />
        <div id="header-content">
          <h3 id="header-text">Welcome To Acquainted.</h3>
          <a>
            <h5>
              Where becoming acquainted is made <b>easy</b>
            </h5>
          </a>
        </div>
        <div className="container about-acquainted">
          <div id="aboutus" className="row acquainted-steps">
            <h2>How to use our service</h2>
            <div className="col s12 m6">
              <div className="card aboutus-cards">
                <div class="card-image">
                  <img src="images/aboutus1.png" />
                </div>
                <div class="card-content">
                  <p>
                    Just enter a few credentials and the city you are moving to, we will take care of the rest
                  </p>
                </div>
                <Link exact to='/account/login'>Log in</Link> or <Link exact to='/account/signup'>Sign up</Link>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card aboutus-cards">
                <div className="card-image">
                  <img src="images/smartmockup-desktop.jpg" />
                </div>
                <div className="card-content desktop">
                  <p>
                    Visit your profile, where you can edit your photo or view your favorite events and locations
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card aboutus-cards">
                <div className="card-image">
                  <img src="images/smartmockup-phone.jpg" />
                </div>
                <div className="card-content desktop">
                  <p>
                   Head to the dashboard to view the most popular places and upcoming events in your city
                  </p>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card aboutus-cards">
                <div className="card-image">
                  <img src="images/smartmockup-ipad.jpg" />
                </div>
                <div className="card-content desktop">
                  <p>
                View an events details to attend, along with the locations informations and discussion board
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hompage;
