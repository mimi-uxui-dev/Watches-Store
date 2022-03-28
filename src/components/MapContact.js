import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from "google-maps-react";

const apiMaps = "AIzaSyBlllMSm32V0wcEqQrcD-FCoP433voN6HA";

const containerStyle = {
     position: 'relative',
     width: '100%',
     height: '400px',
}

class MapContact extends Component {

     render() {
          return (
               <Map
                    containerStyle={containerStyle}
                    google={this.props.google}
                    center={{
                         lat: this.props.lat,
                         lng: this.props.lng,
                    }}
               />

          )
     }
}

export default GoogleApiWrapper({ apiKey: apiMaps })(MapContact)