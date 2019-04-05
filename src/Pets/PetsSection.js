import React from "react";
import styled from "styled-components";
import { Consumer } from "../SearchContext";
import SinglePet from "./SinglePet";
import FilterControls from "../Filters/FilterControls";
import MapSection from "../Maps/MapSection";
import SectionTitle from "../global_components/SectionTitle";
import { Router } from "@reach/router";
import PetDetails from "./PetDetails";

const PetsSection = styled.section``;

const MapContainer = styled.div`
  width: calc(100% - 450px);
`;

const PetsContainer = styled.div`
  display: block;
  width: ${props => (props.showMap ? "450px" : "1400px")};
  position: ${props => (props.showMap ? "fixed" : "relative")};
  height: ${props => (props.showMap ? "100vh" : "auto")};
  max-width: 100%;
  margin: 0 auto;
  right: 0;
  top: 0;
  overflow: auto;
`;

const InnerPetsContainer = styled.div`
  display: block;
  width: 90%;
  padding: ${props => (props.showMap ? "20px 0" : "60px 0")};
  margin: 0 auto;
`;

const PetsGrid = styled.div`
  display: inline-grid;
  grid-gap: 20px;
  grid-template-columns: ${props =>
    props.showMap ? "repeat(2, 1fr)" : "repeat(5, 1fr)"};
  width: 100%;
`;

class PetSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapActive: this.props.showMap,
      isFiltered: this.props.petsAry,
      mapZoom: 11,
      mapCenter: {
        lat: -34.5915392,
        lng: -58.4114176
      },
      activePetID: null,
      hoveredPetID: null
    };
  }

  filterPets = (valueToFilterBy, filterCb) => {
    //We pass this function to the FilterControls component
    //so it can update the state and pass us the callback to update
    //the content.
    //the callback should be the specific function we use to filter the content array
    //let aryToFilter = this.state.isFiltered || this.props.petsAry;
    this.setState({
      isFiltered: [
        ...valueToFilterBy
      ] /*filterCb(aryToFilter, valueToFilterBy)*/
    });
  };

  toggleShowMap = () => {
    this.setState(state => {
      return { isMapActive: !state.isMapActive };
    });
  };

  setActivePet = itemID => {
    this.setState({
      activePetID: itemID
    });
  };

  setHoveredPetID = itemID => {
    this.setState({
      hoveredPetID: itemID
    });
  };

  // zoomMap and reset map are part of the functionality that will zoom the map
  // and center it when the user clicks on an item, if you want to use it
  // just uncomment these lines, don't forget to pass the zooMap function as a prop
  // to the PetDetails component
  //
  // zoomMap = address => {
  //   this.setState({
  //     mapZoom: 12,
  //     mapCenter: address
  //   });
  //   setTimeout(() => {
  //     this.resetMap();
  //   }, 500);
  // };

  // resetMap = () => {
  //   this.setState({
  //     mapZoom: 11,
  //     mapCenter: {
  //       lat: -34.5915392,
  //       lng: -58.4114176
  //     }
  //   });
  // };

  render() {
    let hasFilters = (
      <FilterControls
        updateParentStateFunction={this.filterPets}
        aryToFilter={this.props.petsAry}
        controls={[
          {
            filterType: "selectBar",
            filterPoperty: {
              displayName: "Tamaño",
              value: "size"
            },
            filterBy: {
              displayNames: ["pequeño", "mediano", "grande"],
              values: ["small", "medium", "large"]
            }
          },
          {
            filterType: "dragBar",
            filterPoperty: {
              displayName: "Edad",
              value: "age"
            },
            filterBy: {
              values: [1, 20]
            }
          }
        ]}
      />
    );

    return (
      <PetsSection>
        {this.state.isMapActive && (
          <MapContainer>
            <MapSection
              aryToShow={this.state.isFiltered}
              mapZoom={this.state.mapZoom}
              parentSection="adoptar"
              mapCenter={this.state.mapCenter}
              activeItem={this.state.activePetID}
              hoveredItem={this.state.hoveredPetID}
              setHoveredItem={this.setHoveredPetID}
            />
          </MapContainer>
        )}
        <PetsContainer {...this.props}>
          <InnerPetsContainer showMap={this.state.isMapActive}>
            {this.props.title && <SectionTitle content={this.props.title} />}
            {this.props.showFilters && hasFilters}
            <PetsGrid {...this.props}>
              {this.state.isFiltered.map(pet => {
                return (
                  <SinglePet
                    setHoveredItem={this.setHoveredPetID}
                    isHovered={pet.id === Number(this.state.hoveredPetID)}
                    key={pet.id}
                    id={pet.id}
                    name={pet.name}
                    breed={pet.breed}
                    photo={pet.photo}
                    rescuedBy={pet.rescuedBy}
                  />
                );
              })}
            </PetsGrid>
          </InnerPetsContainer>
          {this.props.children}
        </PetsContainer>
        <Router>
          <PetDetails path=":id" setActivePet={this.setActivePet} />
        </Router>
      </PetsSection>
    );
  }
}

export default function PetSectionWithContext(props) {
  return (
    <Consumer>
      {context => (
        <PetSection
          {...props}
          petsAry={context.petsAry}
          filterBySize={context.filterBySize}
        />
      )}
    </Consumer>
  );
}
