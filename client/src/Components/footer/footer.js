import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import './footer.css'

class Footer extends Component {
  state = {

  }
   
  render() {  
    return (
      <footer class="footer">
      <div class="container">
        <div class="row footer-row">
          <div class="col s4">
            <ul class="footer-list">
              <li>Contact Us</li>
              <li>Contribute</li>
              <li>Careers</li>
              <li>Privacy & Terms</li>
              <li>Submit Feedback</li>
            </ul>
          </div>
          <div class="col s8 center-align">
            <h5>Created by: Sergio</h5>
            <h5>Check me out on <a href="https://github.com/sergiovelo17" target="_blank"><span className='underline'>GitHub</span></a><span><img src="/images/GitHub-Mark-Light-32px.png"/></span></h5>
            <h5>and <a href="https://www.linkedin.com/in/svelikopoljski/" target="_blank"><span className='underline'>LinkedIn</span></a> <i id='linked' class="fab fa-linkedin"></i></h5>
          </div>
        </div>
      </div>
    </footer>
    )
  }
}

export default Footer;
