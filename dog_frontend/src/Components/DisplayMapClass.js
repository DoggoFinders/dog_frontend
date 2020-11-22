// src/DisplayMapClass.js
import * as React from "react";
import { apiKey } from "../config";

/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  const H = window.H;

  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

function dogToDetails(dog) {
  return `<div>hello</div>`;
      // <div >Breed: <br/>Coat color: ${dog.coat_colour}<br/></div></div>`;
}
/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addInfoBubble(map, ui) {
  const H = window.H;
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener(
    "tap",
    function (evt) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        // read custom data
        content: evt.target.getData(),
      });
      // show info bubble
      ui.addBubble(bubble);
    },
    false
  );

  addMarkerToGroup(
    group,
    { lat: 53.439, lng: -2.221 },
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Manchester City</a>' +
      "</div><div >City of Manchester Stadium<br>Capacity: 48,000</div>"
  );

  addMarkerToGroup(
    group,
    { lat: 53.43, lng: -2.961 },
    '<div><a href="http://www.liverpoolfc.tv" target="_blank">Liverpool</a>' +
      "</div><div >Anfield<br>Capacity: 45,362</div>"
  );
}

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null,
    ui: null,
  };

  componentDidUpdate(prevProps, newProps) {
    const H = window.H;
    console.log(this.props);
    let pngIcon = new H.map.Icon(
      "https://cdn3.iconfinder.com/data/icons/pets-13/48/paw_animal_pet_print-512.png",
      { size: { w: 46, h: 46 } }
    );
    if (this.props.dogs && this.state.map && this.state.group) {
      console.log("printing dog: ", this.props.dogs);
      this.props.dogs.forEach((d) => {
        const marker = new H.map.Marker(
          { lat: d.latitude, lng: d.longitude },
          {
            icon: pngIcon,
          }
        );
        console.log(dogToDetails(d));
        marker.setData(dogToDetails(d));
        this.state.group.addObject(marker);
      });
    }
  }

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: apiKey,
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
        pixelRatio: window.devicePixelRatio || 1,
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

    var group = new H.map.Group();

    map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener(
      "tap",
      function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData(),
        });
        // show info bubble
        ui.addBubble(bubble);
      },
      false
    );

    this.setState({ map, ui, group });

    if (!this.props.center) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Location: ", center);
          map.setCenter(center);
          map.addObject(new H.map.Marker(center));
          this.props.onLocationChange(center);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    }

    map.setZoom(14);
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div
        ref={this.mapRef}
        style={{ height: this.props.height || "1000px" }}
      />
    );
  }
}
