import React from "react";
import SizeImg from "./dog_size.png";
import SizeImgBlue from "./dog_size_blue.png";
import styled from "styled-components";

const FilterBarContainer = styled.div`
  text-align: center;
  width: 100px;
  height: 100%;
  margin: 0 5px;
  text-transform: uppercase;
`;

const FilterBarBg = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 10px;
`;

const FilterBarBullet = styled.div`
  display: block;
  position: absolute;
  background-image: url(${props =>
    props.activeBullet ? SizeImgBlue : SizeImg});
  background-size: 100% 100%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -80%);
  &:first-child {
    width: 20px !important;
    height: 20px !important;
  }
  &:last-child {
    width: 40px !important;
    height: 40px !important;
    transform: translate(-30%, -80%);
  }
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBullet: false
    };
  }

  handleFilterClick = valueToFilterBy => {
    //We are calling the function to update the parent state
    //and inside we pass the callback filter function.
    this.props.selectFiltersFunction(
      valueToFilterBy,
      this.props.filterPoperty.value
    );
    this.setState({
      activeBullet: valueToFilterBy
    });
  };

  render() {
    return (
      <FilterBarContainer>
        <p>{this.props.filterPoperty.displayName}</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <FilterBarBg>
          {this.props.filterBy.map((filterProp, index) => {
            return (
              <FilterBarBullet
                activeBullet={this.state.activeBullet === filterProp}
                id={`filter_${this.props.filterPoperty.value}_${filterProp}`}
                key={`filter_${this.props.filterPoperty.value}_${filterProp}`}
                onClick={() =>
                  this.handleFilterClick(
                    filterProp,
                    this.props.filterPoperty.value
                  )
                }
                //We add inline style in order to place the bullets
                //in the correctly position inside the layout
                style={{
                  left: `${index * (84 / (this.props.filterBy.length - 1))}%`
                }}
              />
            );
          })}
        </FilterBarBg>
      </FilterBarContainer>
    );
  }
}

export default FilterBar;
