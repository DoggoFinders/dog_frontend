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

    // Define a variable holding SVG mark-up that defines an animated icon image:
    var animatedSvg =
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" ' + 
        'y="0px" style="margin:-112px 0 0 -32px" width="136px"' + 
        'height="150px" viewBox="0 0 136 150"><ellipse fill="#000" ' +
        'cx="32" cy="128" rx="36" ry="4"><animate attributeName="cx" ' + 
        'from="32" to="32" begin="0s" dur="1.5s" values="96;32;96" ' + 
        'keySplines=".6 .1 .8 .1; .1 .8 .1 1" keyTimes="0;0.4;1"' + 
        'calcMode="spline" repeatCount="indefinite"/>' +    
        '<animate attributeName="rx" from="36" to="36" begin="0s"' +
        'dur="1.5s" values="36;10;36" keySplines=".6 .0 .8 .0; .0 .8 .0 1"' + 
        'keyTimes="0;0.4;1" calcMode="spline" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" from=".2" to=".2"  begin="0s" ' +
        ' dur="1.5s" values=".1;.7;.1" keySplines=" .6.0 .8 .0; .0 .8 .0 1" ' +
        'keyTimes=" 0;0.4;1" calcMode="spline" ' +
        'repeatCount="indefinite"/></ellipse><ellipse fill="#1b468d" ' +
        'cx="26" cy="20" rx="16" ry="12"><animate attributeName="cy" ' +
        'from="20" to="20" begin="0s" dur="1.5s" values="20;112;20" ' +
        'keySplines=".6 .1 .8 .1; .1 .8 .1 1" keyTimes=" 0;0.4;1" ' +
        'calcMode="spline" repeatCount="indefinite"/> ' +
        '<animate attributeName="ry" from="16" to="16" begin="0s" ' + 
        'dur="1.5s" values="16;12;16" keySplines=".6 .0 .8 .0; .0 .8 .0 1" ' +
        'keyTimes="0;0.4;1" calcMode="spline" ' +
        'repeatCount="indefinite"/></ellipse></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(animatedSvg),
        coords = {lat: 46.248929366435426, lng: 6.024057144759881},
        marker = new H.map.DomMarker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.setCenter(coords);
    map.setZoom(18);
    map.addObject(marker);
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