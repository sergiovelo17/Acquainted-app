import React, { Component } from "react";
import "./details.css";
import { Route, Link, Switch } from "react-router-dom";
import AuthService from "../../services/AuthService";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Details extends Component {
  state = {
    details: null,
    stopReload: false,
    favorited: false,
    updated: false
  };
  service = new AuthService();
  componentDidMount(){
    this.getDetails();
  }
  

  getDetails = () => {
    console.log('hi')
    if (!this.state.stopReload || this.props.readyToUpdate) {
      if (this.props.match) {
        let id = this.props.match.params.id;
        this.props.getUser();
        if (this.props.user) {
          axios
            .post(
              `${process.env.REACT_APP_BASE}/places/placeDetails/${id}`,
              { user_id: this.props.user._id },
              { withCredentials: true }
            )
            .then(response => {
              this.setState({
                details: response.data.place,
                favorited: response.data.isFavorited,
                stopReload: true,
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.props.history.push("/account/login");
        }
      } else {
        let id = this.props.placeDetailsId;
        this.props.getUser();
        if (this.props.user) {
          axios
            .post(
              `${process.env.REACT_APP_BASE}/places/placeDetails/${id}`,
              { user_id: this.props.user._id },
              { withCredentials: true }
            )
            .then(response => {
              this.setState({
                details: response.data.place,
                favorited: response.data.isFavorited,
                stopReload: true,
                updated: true
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.props.history.push("/account/login");
        }
      }
    }
  };
  showHours = () => {
    if (this.state.details.hours) {
      return this.state.details.hours.map(eachDay => {
        return <p>{eachDay}</p>;
      });
    }
  };
  getReviews = () => {
    if (this.state.details.reviews) {
      return this.state.details.reviews.map(eachReview => {
        return (
          <div className="col s12 m5 eachReview">
            <div className="center-align">
              <img
                src={eachReview.profile_photo_url}
                width="25%"
                className="profile-pic-review"
                alt="profile picture"
              />
            </div>
            <p>By: {eachReview.author_name}</p>
            <p>
              Rating: {eachReview.rating} |{" "}
              {eachReview.relative_time_description}
            </p>
            <p>{eachReview.text}</p>
          </div>
        );
      });
    }
  };
  imageCarousel = () => {
    if (this.state.details.photos.length > 0) {
      console.log(this.state.details.photos)
      return (
        <Carousel>
          <div>
            <img
              src={this.state.details.photos[0]}
              height="250px"
              alt="no photo available"
            />
          </div>
          <div>
            <img
              src={this.state.details.photos[1]}
              height="250px"
              alt="no photo available"
            />
          </div>
          <div>
            <img
              src={this.state.details.photos[2]}
              height="250px"
              alt="no photo available"
            />
          </div>
        </Carousel>
      );
    }else{
      return <img width='300px' height='250px' src='/images/nophoto.png'/>
    }
  };
  addToFavorites = () => {
    this.props.getUser();
    if (this.props.user) {
      axios
        .post(
          `${process.env.REACT_APP_BASE}/places/addToFavoritePlaces/${
            this.state.details._id
          }`,
          { favorited: this.state.favorited },
          {
            withCredentials: true
          }
        )
        .then(response => {
          console.log(response);
          this.props.getUser();
          this.setState({ favorited: !this.state.favorited });
        });
    } else {
      this.props.history.push("/");
      return;
    }
  };
  showDetails = () => {
    return (
      <div>
        <div className="col s12 m6">
          <h2>{this.state.details.name}</h2>
          <h5>{this.state.details.address}</h5>
          <h5>{this.state.details.phone}</h5>
          {!this.state.details.hours &&
          <h5>No available hours</h5>
          }
          {this.state.details.hours &&
          <h5>Hours: </h5>
          }
          {this.showHours()}
          {this.state.details.website &&
          <a
            href={this.state.details.website}
            rel="noopener noreferrer"
            target="_blank"
          >
            Link to their website
          </a>
          }
          <br />
          {!this.state.favorited && (
            <button
              className="btn waves-effect waves-light addFavoritesButton"
              onClick={this.addToFavorites}
            >
              Add to favorites
            </button>
          )}
          {this.state.favorited && (
            <button
              className="btn waves-effect waves-light favoritedButton"
              onClick={this.addToFavorites}
            >
              Favorited
            </button>
          )}
        </div>
        <div id="details-carousel" className="col s12 m6">
          {this.imageCarousel()}
        </div>
        {this.state.details.reviews.legnth > 0 &&
        <div className="col s12">
          <h4>Reviews</h4>
          <p>
            Rating avg: {this.state.details.rating}/5 | Price:{" "}
            {this.state.details.price_level}/4
          </p>
        </div>
          }
        <div id="place-reviews" className="col s12">
          {this.getReviews()}
        </div>
      </div>
    );
  };

  render() {
    if (this.props.ready)
      return (
        <div className="container">
          <div className="row">
            {this.state.details && this.showDetails()}
          </div>
        </div>
      );
    else return <h1>Loading</h1>;
  }
}

export default Details;
