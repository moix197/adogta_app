import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const OuterSinglePet = styled.button`
  opacity: ${props => (props.isHovered ? "0.5" : "1")};
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
  border-radius: 10px;
  background-color: #61dafb;
  overflow: hidden;
`;

const SinglePetTxt = styled.div`
  padding: 10px;
  text-align: left;
`;

const SinglePetImg = styled.img`
  width: 100%;
`;

class SinglePet extends React.Component {
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
      <OuterSinglePet
        onMouseEnter={() => {
          console.log(this.props.id);
          this.props.setHoveredItem(this.props.id);
        }}
        onMouseLeave={() => {
          this.props.setHoveredItem(null);
        }}
        isHovered={this.state.isHovered}
      >
        <Link to={`/adoptar/${this.props.id}`} hola={"heyyy"}>
          <div>
            <SinglePetImg src={this.props.photo} />
          </div>
          <SinglePetTxt>
            <h5>{this.props.name}</h5>
            <p>{this.props.breed}</p>
            <p>{this.props.rescuedBy.name}</p>
          </SinglePetTxt>
        </Link>
      </OuterSinglePet>
    );
  }
}

export default SinglePet;
