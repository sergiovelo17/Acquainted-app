import React, {Component} from 'react';
import './carousel.css';
import {Route, Link, Switch} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import M from "materialize-css";

class Carousel extends Component {
  componentDidMount() {
    let carousel = document.querySelectorAll(".carousel");
    let instance = M.Carousel.init(carousel, {fullWidth: true, indicators: true});
  }
render(){ 
  return(
<div class="carousel carousel-slider center">
    <div class="carousel-fixed-item center">
      <a class="btn waves-effect white grey-text darken-text-2">button</a>
    </div>
    <div id="carousel1" className="carousel-item white-text" href="#one!">
      <h2>First Panel</h2>
      <p class="white-text">This is your first panel</p>
    </div>
    <div id="carousel2" className="carousel-item amber white-text" href="#two!">
      <h2>Second Panel</h2>
      <p class="white-text">This is your second panel</p>
    </div>
    <div id="carousel3" className="carousel-item green white-text" href="#three!">
      <h2>Third Panel</h2>
      <p class="white-text">This is your third panel</p>
    </div>
    <div id="carousel4" className="carousel-item blue white-text" href="#four!">
      <h2>Fourth Panel</h2>
      <p class="white-text">This is your fourth panel</p>
    </div>
  </div>
  )
}
}
export default Carousel;
        