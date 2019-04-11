import React from "react";
import styled from "styled-components";
import SingleBreed from "./SingleBreed";
import { Consumer } from "../SearchContext";
import BreedDetails from "./BreedDetails";
import FilterControls from "../Filters/FilterControls";
import SectionTitle from "../global_components/SectionTitle";
import { Router } from "@reach/router";

const Container = styled.div`
  display: block;
  width: ${props => (props.isItemActive ? "1000px" : "1400px")};
  max-width: ${props => (props.isItemActive ? "calc(100% - 450px)" : "100%")};
  padding: ${props => (props.isItemActive ? "60px 450px 60px 0" : "60px 0")};
  margin: 0 auto;
`;

const OuterBreedsGrid = styled.div`
  display: block;
  width: 90%;
  margin: 0 auto;
`;

const BreedsGrid = styled.div`
  display: inline-grid;
  grid-gap: 20px;
  grid-template-columns: ${props =>
    props.isItemActive ? "repeat(4, 1fr)" : "repeat(8, 1fr)"};
`;

class BreedsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breedsAry: [],
      isFiltered: false,
      isItemActive: false
    };
  }

  filterBreeds = valueToFilterBy => {
    //this function is passed to the function controls
    //so that i'll be able to update the isFiltered state with the
    //filtered array
    this.setState({
      isFiltered: valueToFilterBy
    });
  };

  componentDidMount() {
    this.getBreeds();
  }

  getBreeds() {
    fetch("https://api.thedogapi.com/v1/breeds")
      .then(res => res.json())
      .then(result => {
        this.setState({
          breedsAry: result
        });
      });
  }

  //we handle the active items this way to be able to also set
  //the active state in the correct map pointer and shelter item
  updateActiveItem = () => {
    this.setState(prevState => {
      return { isItemActive: !prevState.isItemActive };
    });
  };

  render() {
    let breeds = this.state.isFiltered || this.state.breedsAry,
      itemsLimit = this.props.limit || this.state.breedsAry.length;

    let filters = (
      <FilterControls
        updateParentStateFunction={this.filterBreeds}
        aryToFilter={this.state.breedsAry}
        //TODO this may be good to be changed to separate parameters
        //instead of an object
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
          }
        ]}
      />
    );

    if (this.state.breedsAry.length === 0) {
      //TODO: find a nice loading image and fix
      return <Container>Loading...</Container>;
    }

    return (
      <section>
        <Container isItemActive={this.state.isItemActive}>
          {this.props.children}

          {this.props.title && <SectionTitle content={this.props.title} />}
          <div>{this.props.showFilters && filters}</div>
          <OuterBreedsGrid isItemActive={this.state.isItemActive}>
            <BreedsGrid isItemActive={this.state.isItemActive}>
              {breeds.map(function(breed, index) {
                if (index < itemsLimit) {
                  return (
                    <SingleBreed
                      key={breed.id}
                      id={breed.id}
                      name={breed.name}
                    />
                  );
                }
                return false;
              })}
            </BreedsGrid>
          </OuterBreedsGrid>
          <Router>
            <BreedDetails
              path=":name"
              breedsAry={this.state.breedsAry}
              updateActiveItem={this.updateActiveItem}
            />
          </Router>
        </Container>
      </section>
    );
  }
}

export default function BreedsSectionWithContext(props) {
  return (
    <Consumer>
      {context => (
        <BreedsSection {...props} filterBySize={context.filterBySize} />
      )}
    </Consumer>
  );
}
