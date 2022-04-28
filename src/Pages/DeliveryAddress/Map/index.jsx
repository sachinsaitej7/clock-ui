import React, { Component, Fragment } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      address: "" 
    };
  }

  handleClick = (event) => {
    this.setState({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    });
  };

  CMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 13.0011345, lng: 80.1813939999999 }}
        onClick={this.handleClick}
        options={{
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
        }}
      >
        {props.children}
      </GoogleMap>
    ))
  );

  render() {
    return (
      <>

        <Fragment>
          <script src="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU">
        
          </script>
          <this.CMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `92.5vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            <Marker
              position={{ lat: this.state.latitude, lng: this.state.longitude }}
            />
          
                    
    
     

          </this.CMap>
        </Fragment>
        
      </>
    );
  }
}

export default Map;
