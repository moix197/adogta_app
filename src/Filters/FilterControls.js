import React from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import FilterDragBar from "./FilterDragBar";

const FiltersSectionContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1, 1fr;
  width: 100%;
<p>&nbsp;</p>`;

const OuterFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const FiltersTitle = styled.div`
  text-align: center;
`;

class FilterControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredByAge: false,
      filteredBySize: false
    };
  }
  getSize(pet) {
    let petWeight = 0,
      isSize;

    //check if it's a breed or a pet
    //and set the correr weight
    if (pet.weight !== undefined && pet.weight.metric !== undefined) {
      let tempWeight = pet.weight.metric.split(" ");
      petWeight = Number(tempWeight[tempWeight.length - 1]);
    } else if (pet.weight !== undefined) {
      petWeight = pet.weight;
    }

    if (petWeight < 10) {
      isSize = "small";
    } else if (petWeight < 17) {
      isSize = "medium";
    } else {
      isSize = "large";
    }

    return isSize;
  }

  filterItems = callbacks => {
    return this.props.aryToFilter.filter(item => {
      let isTarget = true;
      for (let i = 0; i < callbacks.length; i++) {
        if (!callbacks[i](item)) {
          isTarget = false;
        }
      }
      return isTarget && item;
    });
  };

  filterBySize = item => {
    let itemSize = this.getSize(item);
    return itemSize === this.state.filteredBySize;
  };

  filterByAge = item => {
    return (
      item.age >= this.state.filteredByAge[0] &&
      item.age <= this.state.filteredByAge[1]
    );
  };

  selectFilters = (valueToFilterBy, filterPropertyValue) => {
    //Here we select the correct function that we will
    //pass as a callback to the "toUpdateState" function that comes
    //from the parent
    switch (filterPropertyValue) {
      case "size":
        this.setState({ filteredBySize: valueToFilterBy }, () => {
          this.executeFilters();
        });
        break;
      case "age":
        this.setState({ filteredByAge: valueToFilterBy }, () => {
          this.executeFilters();
        });
        break;
      default:
        break;
    }
  };

  executeFilters() {
    let neededFilters = [],
      filteredAry;

    if (this.state.filteredByAge) {
      neededFilters.push(this.filterByAge);
    }
    if (this.state.filteredBySize) {
      neededFilters.push(this.filterBySize);
    }

    filteredAry = this.filterItems(neededFilters);
    this.props.updateParentStateFunction(filteredAry);
  }

  checkFilterType = item => {
    //Here we are checking the Type of Filter that the component
    //should use in order to return the right component.
    //e.g: selectBar, dragBar, searchBox
    let selectedFilter;

    switch (item.filterType) {
      case "selectBar":
        selectedFilter = (
          <FilterBar
            key={`parent_${item.filterPoperty.displayName}`}
            filterPoperty={item.filterPoperty}
            filterByNames={item.filterBy.displayNames}
            filterBy={item.filterBy.values}
            selectFiltersFunction={this.selectFilters}
          />
        );
        break;
      case "dragBar":
        selectedFilter = (
          <FilterDragBar
            key={`parent_${item.filterPoperty.displayName}`}
            filterPoperty={item.filterPoperty}
            selectFiltersFunction={this.selectFilters}
            filterBy={item.filterBy.values}
          />
        );
        break;
      default:
        selectedFilter = null;
        break;
    }
    return selectedFilter;
  };

  render() {
    return (
      <FiltersSectionContainer>
        <FiltersTitle>
          <h5>Filtros</h5>
        </FiltersTitle>
        <OuterFilters>
          {this.props.controls.map(item => {
            return this.checkFilterType(item);
          })}
        </OuterFilters>
        <p>&nbsp;</p>
      </FiltersSectionContainer>
    );
  }
}

export default FilterControls;
