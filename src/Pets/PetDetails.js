import React from "react";
import styled from "styled-components";
import { Consumer } from "../SearchContext";
import Dog from "../loading.gif";
import { Link } from "@reach/router";
import Button from "../global_components/Buttons";

const PetDetailsContainer = styled.div`
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
  color: #fff;
  background-color: #282c34;
`;

const OuterImage = styled.div`
  width: 100%;
`;

const PetImg = styled.img`
  width: 100%;
`;

const OuterPetDescription = styled.div``;

const OuterName = styled.div`
  text-transform: uppercase;
  text-align: center;
`;

class PetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      breed: "",
      rescuedBy: "",
      address: "",
      photo: "",
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

  setCorrectStates(givenID) {
    this.props.petsAry.map(pet => {
      if (Number(givenID) === pet.id) {
        this.setState({
          name: pet.name,
          breed: pet.breed,
          rescuedBy: pet.rescuedBy.name,
          isLoading: false,
          photo: pet.photo
        });
        // these lines are part of the function that will zoom the map
        // and center it when the user clicks on an item, if you want to use it
        // just uncomment these lines
        // setTimeout(() => {
        //   this.props.zoomMap(pet.rescuedBy.address);
        // }, 300);
      }
      this.props.setActivePet(givenID);
      return false;
    });
  }

  handleGoBackBtn = () => {
    this.props.setActivePet(null);
  };

  render() {
    if (this.state.isLoading) {
      return (
        //TODO: find a nice loading image and fix
        <div>
          <img src={Dog} alt="dog loading" />
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <PetDetailsContainer>
        <OuterImage>
          <OuterImage>
            <PetImg src={this.state.photo} alt="dog thumbnail" />
          </OuterImage>
          <OuterPetDescription>
            <p>&nbsp;</p>
            <OuterName>
              <h2>{this.state.name}</h2>
            </OuterName>
            <p>&nbsp;</p>
            <p>RAZA: {this.state.breed}</p>
            <p>RESCATISTA: {this.state.rescuedBy}</p>
            {/*<p>age: {this.props.selectedPet.age}</p>
          <p>size:{this.props.selectedPet.size}</p>
      <p>{this.props.selectedPet.description}</p>*/}
          </OuterPetDescription>
          <p>&nbsp;</p>
          <Link to="/adoptar" onClick={this.handleGoBackBtn}>
            <Button componentTxt="VOLVER" />
          </Link>
        </OuterImage>
      </PetDetailsContainer>
    );
  }
}

export default function PetDetailsWithContext(props) {
  return (
    <Consumer>
      {context => <PetDetails {...props} petsAry={context.petsAry} />}
    </Consumer>
  );
}
