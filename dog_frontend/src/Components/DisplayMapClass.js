// src/DisplayMapClass.js
import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "QV4hFAxgCO4_vlEYSijoVV2qP0wL8m2rp1i_7Cs6y0M"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);
 
    this.setState({ map });

    // Create an icon, an object holding the latitude and longitude, and a marker:
    //var icon = new H.map.Icon('./testdog.jpg'),
    var coords = {center: {lat: 46.248929366435426, lng: 6.024057144759881},
                  pos1: {lat: 46.24337946807697, lng: 6.013671631566258},
                  pos2: {lat: 46.24332010784052, lng: 6.023670906665904}
                  }

    for (var point in coords) {
      if(point === 'center') {
        map.setCenter(coords[point]);
      } else {
        map.addObject(new H.map.Marker(coords[point]));
      }
      // console.log(coords[point])
    }

    map.setZoom(14);

    // for (var marker in markers){
    //   map.addObject(marker);
    // }

    // marker = new H.map.Marker(coords);

    // // Add the marker to the map and center the map at the location of the marker:
    // map.setZoom(8);
    // map.addObject(marker);

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //     var centerCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
    //     map.setCenter(centerCoords);
    //   });
    // } else {
    //   map.setCenter(coords);
    // }
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "1000px" }} />
    );
  }
}