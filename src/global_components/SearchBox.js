import React from "react";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  render() {
    return (
      <div>
        <input
          onChange={this.handleInputChange}
          onBlur={this.handleInputChange}
          value={this.state.searchValue}
          placeholder="Comenta tu busqueda"
        />
        <button>Find!</button>
      </div>
    );
  }
}

export default SearchBox;
