import React from "react";
import './map.css'
import { Route, Link, Switch } from "react-router-dom";

class MyMap extends React.Component {

  render() {
    const { compose, withProps, lifecycle, withStateHandlers} = require("recompose");

    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      Marker,
      InfoWindow
    } = require("react-google-maps");
    const UsersMap = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBht5Low4uRnWs5MUcGoBnE3nvcG31AxUU&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div className='map' style={{ height: `100%` }} />
      }),withStateHandlers(() => ({
        isOpen: false,
        infoIndex: -1,
        event: null,
        name: null
      }), {
        onToggleOpen: ({ isOpen }) => (e, index,name) => ({
          isOpen: !isOpen,
          infoIndex: index,
          event: e,
          name: name
        })
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={
          new window.google.maps.LatLng(this.props.lat, this.props.lng)
        }
        >
 { //curly brace here lets you write javscript in JSX
      // console.log("the marker info --------- ", props, props.event) &&
        this.props.user.favoritePlaces.map((location,index) =>
        
            <Marker
              icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
              key={location._id}
              title={location.name}
              name={location.name}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={(e)=>props.onToggleOpen(e, index,location.name)}            >

          {props.isOpen && props.infoIndex === index && props.name == location.name &&
          <InfoWindow onCloseClick={props.onToggleOpen} id={location._id} visible={true}>
                <div>
                  <h5>Favorited Location</h5>
                  <Link exact to={`/details/${location.placeId}`}><h6>{location.name}</h6></Link>
                  <img width='50%' src={location.photos[0]}></img>
                </div>
            </InfoWindow>
          }
            </Marker>
          )
      }    
      { //curly brace here lets you write javscript in JSX
        this.props.user.upcomingEvents.map((event,index) =>
            <Marker
              icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
              key={index}
              title={event.location.name}
              name={event.location.name}
              position={{ lat: event.location.lat, lng: event.location.lng }}
              onClick={(e)=>props.onToggleOpen(e, index, event.location.name)}            >
            
            { props.isOpen && props.infoIndex === index && props.name == event.location.name &&
              <InfoWindow onCloseClick={props.onToggleOpen} id={index} visible={true}>
                    <div>
                      <h5>Event Scheduled</h5>
                      <h6>{event.title}</h6>
                      <Link exact to={`/details/${event.location.placeId}`}><h6>{event.location.name}</h6></Link>
                        <img width='50%' src={event.location.photos[0]}></img>
                    </div>
                </InfoWindow>
              }
            </Marker> 
        )
      }   
       </GoogleMap>
    ));
    
    return <UsersMap />
  }
}
export default MyMap;
