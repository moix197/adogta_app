import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { Link } from "@reach/router";

const MapMarker = styled.div``;

const InnerMarker = styled.button`
  background-color:${props => (props.isActive ? "green" : "red")}
  position: absolute;
  width: 20px;
  height: 20px;
  top: -20px;
  left: -5px;
  border: 1px solid #000;
  border-radius: ${props => (props.isActive ? "50%" : "50% 50% 50% 0%")};
  transform: rotate(-45deg) ${props => {
    if (props.isActive) return;

    return props.isHovered ? "scale(1.5)" : "";
  }};
  cursor: pointer;
`;

class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.mapCenter,
      zoom: this.props.mapZoom,
      activeItem: this.props.activeItem,
      hoveredItem: this.props.hoveredItem,
      isScrolling: false,
      isLoading: true
    };
  }
  static defaultProps = {
    center: {
      lat: -34.5915392,
      lng: -58.4114176
    },
    zoom: 11
  };

  setGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(e => {
      this.setState({
        center: {
          lat: e.coords.latitude,
          lng: e.coords.longitude,
          isLoading: false
        }
      });
    });
  };

  handleHover = itemID => {
    this.props.setHoveredItem(itemID);
  };

  setMarkers() {
    return this.props.aryToShow.map(item => {
      if (!item.address) {
        return (
          <MapMarker
            key={item.id}
            lat={item.rescuedBy.address.lat}
            lng={item.rescuedBy.address.lng}
            text={item.id}
          >
            <Link to={`/${this.props.parentSection}/${item.id}`}>
              <InnerMarker
                onMouseEnter={() => {
                  this.handleHover(item.id);
                }}
                onMouseLeave={() => {
                  this.handleHover(null);
                }}
                isActive={item.id === Number(this.props.activeItem)}
                isHovered={item.id === Number(this.props.hoveredItem)}
              />
            </Link>
          </MapMarker>
        );
      }
      return (
        <MapMarker
          key={item.id}
          lat={item.address.lat}
          lng={item.address.lng}
          text="My Marker"
        >
          <Link to={`/${this.props.parentSection}/${item.id}`}>
            <InnerMarker
              onMouseEnter={() => {
                this.handleHover(item.id);
              }}
              onMouseLeave={() => {
                this.handleHover(null);
              }}
              isActive={item.id === Number(this.props.activeItem)}
              isHovered={item.id === Number(this.props.hoveredItem)}
            />
          </Link>
        </MapMarker>
      );
    });
  }

  // componentDidUpdate and handleMapChange are part of the functionality that will zoom the map
  // and center it when the user clicks on an item, if you want to use it
  // just uncomment these lines, don't forget to pass the handleMapChange function as the "onChange" prop
  // to the GoogleMapReact component

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.mapZoom !== this.props.mapZoom && this.props.mapZoom === 12) {
  //     this.setState({
  //       zoom: this.props.mapZoom,
  //       center: this.props.mapCenter
  //     });
  //   }
  // }

  // handleMapChange = (...args) => {
  //   if (args[0].zoom !== this.state.userZoom) {
  //     this.setState({
  //       zoom: args[0].zoom,
  //       center: args[0].center
  //     });
  //   }
  // };

  render() {
    if (this.state.center.lat === false || this.state.center.lng === false) {
      return <div>Loading...</div>;
    }
    let apiKey = "AIzaSyBrfqCJShBPF9DpGjfUJ60ZaEVLnt7VGsA";
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={[-34.5915392, -58.4114176]}
          defaultZoom={11}
          zoom={this.state.zoom}
          center={this.state.center}
        >
          {this.setMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapSection;
