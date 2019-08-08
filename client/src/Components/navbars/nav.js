import React from 'react';
import './nav.css';
import {Route, Link, Switch} from 'react-router-dom';

function Nav(props) {
  return (
    <div className="App">
    {props.user && 
   <nav>
   <div className="nav-wrapper acquainted-nav">
    <Link exact to='/'><img src="/images/acquainted-logo1.png" width="14%" className="left acquainted-logo"/></Link>
     <ul id="nav-mobile" class="right hide-on-med-and-down">
       <li><Link exact to='/dashboard'>Dashboard</Link></li>
       <li><a href="badges.html">Messages</a></li>
       <li><Link exact to='/profile'>Profile</Link></li>
       <li><a onClick={props.logout} href="collapsible.html">Log out</a></li>
     </ul>
   </div>
 </nav>
}
    {!props.user && 
    <nav>
    <div className="nav-wrapper acquainted-nav">
    <Link exact to='/'><img src="/images/acquainted-logo1.png" width="14%" className="left acquainted-logo"/></Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#aboutus">About</a></li>
        <li><Link exact to='/account/login'>Log in</Link></li>
        <li><Link exact to='/account/signup'>Sign up</Link></li>
      </ul>
    </div>
  </nav>
}
    </div>
  );
}

export default Nav;
