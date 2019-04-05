import React from "react";
import { Consumer } from "../SearchContext";
import FilterControls from "./FilterControls";

class FilterSection extends React.Component {
  render() {
    return (
      <FilterControls parentFilterFunction={this.props.parentFilterFunction} />
    );
  }
}

export default function FilterSectionWithContext(props) {
  return (
    <Consumer>
      {context => (
        <FilterSection {...props} filterBySize={context.filterBySize} />
      )}
    </Consumer>
  );
}
