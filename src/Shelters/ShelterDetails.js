import React from "react";
import loadingImage from "../loading.gif";
import { Consumer } from "../SearchContext";
import styled from "styled-components";
import { Link } from "@reach/router";
import Button from "../global_components/Buttons";

const ShelterDetailsContainer = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: calc(450px - 95px);
  height: calc(100vh - 80px);
  top: 0;
  right: 0;
  padding: 40px;
  margin-right: 15px;
  background-color: #282c34;
`;

const OuterImage = styled.div`
  width: 100%;
`;

const ShelterImg = styled.img`
  width: 100%;
`;

const OuterShelterDescription = styled.div`
  color: #fff;
`;

const OuterName = styled.div`
  padding: 20px 0;
  text-transform: uppercase;
  text-align: center;
`;

class ShelterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      representative: null,
      city: null,
      area: null,
      photo: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setCorrectStates(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setCorrectStates(this.props.id);
    }
  }

  setCorrectStates = givenID => {
    this.props.sheltersAry.map(shelter => {
      if (Number(givenID) === Number(shelter.id)) {
        this.setState({
          name: shelter.name,
          representative: shelter.representative,
          city: shelter.city,
          area: shelter.area,
          photo: shelter.photo,
          isLoading: false
        });
      }
      this.props.setActiveShelter(givenID);
      return false;
    });
  };

  handleGoBackBtn = () => {
    console.log("bien");
    this.props.setActiveShelter(null);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <img src={loadingImage} alt="Loading Gif" />
        </div>
      );
    }
    return (
      <ShelterDetailsContainer>
        <div>
          <div>
            <OuterImage>
              <ShelterImg
                src={this.state.photo}
                alt={`Refugio ${this.state.name}`}
              />
            </OuterImage>
            <OuterShelterDescription>
              <OuterName>
                <h1>{this.state.name}</h1>
              </OuterName>
              <p>Rescatista: {this.state.representative}</p>
              <p>Ciudad: {this.state.city}</p>
            </OuterShelterDescription>
            <Link to="/refugios" onClick={this.handleGoBackBtn}>
              <Button componentTxt="VOLVER" />
            </Link>
          </div>
        </div>
      </ShelterDetailsContainer>
    );
  }
}

export default function ShelterDetailsWithContext(props) {
  return (
    <Consumer>
      {context => (
        <ShelterDetails {...props} sheltersAry={context.sheltersAry} />
      )}
    </Consumer>
  );
}
