import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const OuterSingleShelter = styled.button`
  opacity: ${props => (props.isHovered ? "0.5" : "1")};
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
  border-radius: 10px;
  background-color: #61dafb;
  overflow: hidden;
`;

const ShelterImg = styled.img`
  width: 100%;
`;

const OuterShelterTxt = styled.div`
  padding: 10px;
  text-align: left;
`;

class SingleShelter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: this.props.isHovered
    };
  }
  componentDidUpdate = prevProps => {
    if (prevProps.isHovered !== this.props.isHovered) {
      this.setState({
        isHovered: this.props.isHovered
      });
    }
  };
  render() {
    return (
      <OuterSingleShelter
        onMouseEnter={() => {
          this.props.setHoveredItem(this.props.id);
        }}
        onMouseLeave={() => {
          this.props.setHoveredItem(null);
        }}
        isHovered={this.state.isHovered}
      >
        <Link to={`/refugios/${this.props.id}`}>
          <div>
            <ShelterImg src={this.props.photo} alt="shelter img" />
          </div>
          <OuterShelterTxt>
            <h5>{this.props.name}</h5>
            <p>{this.props.representative}</p>
            <p>{this.props.city}</p>
          </OuterShelterTxt>
        </Link>
      </OuterSingleShelter>
    );
  }
}

export default SingleShelter;
