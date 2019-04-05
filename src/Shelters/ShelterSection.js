import React from "react";
import styled from "styled-components";
import { Consumer } from "../SearchContext";
import SingleShelter from "./SingleShelter";
import MapSection from "../Maps/MapSection";
import SectionTitle from "../global_components/SectionTitle";
import ShelterDetails from "./ShelterDetails";
import { Router } from "@reach/router";

const SheltersSection = styled.section`
  background-color: #4b4a4a;
`;

const MapContainer = styled.div`
  width: calc(100% - 450px);
`;

const SheltersContainerWithMap = `width: 450px; position: fixed;`;
const SheltersContainerNoMap = `width: 1400px; max-width: 100%`;
const SheltersContainer = styled.div`
  display: block;
  ${props =>
    props.showMap ? SheltersContainerWithMap : SheltersContainerNoMap}
  margin: 0 auto;
  top: 0;
  right: 0;
  overflow: auto;
`;

const InnerSheltersContainer = styled.div`
  display: block;
  width: 90%;
  padding: 60px 0;
  margin: 0 auto;
`;

const SheltersGrid = styled.div`
  display: inline-grid;
  grid-template-columns: ${props =>
    props.showMap ? `repeat(2, 1fr)` : `repeat(3, 1fr)`};
  grid-gap: 20px;
  width: 100%;
`;

class ShelterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapActive: this.props.showMap,
      mapZoom: 11,
      mapCenter: {
        lat: -34.5915392,
        lng: -58.4114176
      },
      activeShelterID: null,
      hoveredShelterID: null
    };
  }

  toggleShowMap = () => {
    this.setState(state => {
      return { isMapActive: !state.isMapActive };
    });
  };

  setActiveShelter = itemID => {
    this.setState({
      activeShelterID: itemID
    });
  };

  setHoveredShelterID = itemID => {
    this.setState({
      hoveredShelterID: itemID
    });
  };

  render() {
    return (
      <SheltersSection>
        {this.state.isMapActive && (
          <MapContainer>
            <MapSection
              aryToShow={this.props.sheltersAry}
              mapZoom={this.state.mapZoom}
              parentSection="refugios"
              mapCenter={this.state.mapCenter}
              activeItem={this.state.activeShelterID}
              hoveredItem={this.state.hoveredShelterID}
              setHoveredItem={this.setHoveredShelterID}
            />
          </MapContainer>
        )}
        <SheltersContainer {...this.props}>
          <InnerSheltersContainer>
            {this.props.title && <SectionTitle content={this.props.title} />}
            <SheltersGrid {...this.props}>
              {this.props.sheltersAry.map(shelter => {
                return (
                  <SingleShelter
                    key={shelter.id}
                    setHoveredItem={this.setHoveredShelterID}
                    isHovered={
                      shelter.id == Number(this.state.hoveredShelterID)
                    }
                    id={shelter.id}
                    name={shelter.name}
                    representative={shelter.representative}
                    city={shelter.city}
                    photo={shelter.photo}
                  />
                );
              })}
            </SheltersGrid>
          </InnerSheltersContainer>
          {this.props.children}
        </SheltersContainer>
        <Router>
          <ShelterDetails path=":id" setActiveShelter={this.setActiveShelter} />
        </Router>
      </SheltersSection>
    );
  }
}

export default function ShelterSectionWithContext(props) {
  return (
    <Consumer>
      {context => (
        <ShelterSection {...props} sheltersAry={context.sheltersAry} />
      )}
    </Consumer>
  );
}
