import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

class Map extends Component {
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={Styles.map}
        region={{
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    );
  }
}

export default Map;

const Styles = StyleSheet.create({
  map: {
    height: 200,
    flex: 1,
    shadowRadius: 20,
    elevation: 3,
    shadowColor: "#75a4ff",
    shadowOpacity: 0.8,
    borderRadius: 5
  }
});
