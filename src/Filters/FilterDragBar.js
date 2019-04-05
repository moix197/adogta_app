import React from "react";
import styled from "styled-components";

const OuterFilterBar = styled.div`
  height: 100%;
  padding: 0 10px;
  text-align: center;
  text-transform: uppercase;
`;

class FilterDragBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: this.props.filterBy[1]
    };
  }

  handleFilterClick = e => {
    this.setState({
      rangeValue: e.target.value
    });
    this.props.selectFiltersFunction(
      [this.props.filterBy[0], e.target.value],
      this.props.filterPoperty.value
    );
  };

  render() {
    return (
      <OuterFilterBar>
        <div>
          <p>{this.props.filterPoperty.displayName}</p>
          <p>&nbsp;</p>
        </div>
        <div>
          <input
            type="range"
            min={this.props.filterBy[0]}
            max={this.props.filterBy[1]}
            value={this.state.rangeValue}
            onChange={this.handleFilterClick}
          />
          {/*<p>
            {this.props.filterBy[0] - 1} -{" "}
            {this.state.rangeValue > 1
              ? `${this.state.rangeValue} años`
              : `${this.state.rangeValue} año`}{" "}
            </p>*/}
        </div>
      </OuterFilterBar>
    );
  }
}

export default FilterDragBar;
