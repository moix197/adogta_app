import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const SingleBreedItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 10px;
  background-color: #61dafb;
  overflow: hidden;
`;

class SingleBreed extends React.Component {
  render() {
    return (
      <Link to={`/razas/${this.props.name.replace(/ /g, "_")}`}>
        <SingleBreedItem>
          <h5>{this.props.name}</h5>
        </SingleBreedItem>
      </Link>
    );
  }
}

export default SingleBreed;
