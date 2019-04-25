import React from "react";
import styled from "styled-components";
import Dog from "../loading.gif";
import { Link } from "@reach/router";
import Button from "../global_components/Buttons";

const ItemDetailsContainer = styled.div`
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

const ItemImg = styled.img`
  width: 100%;
`;

const OuterItemDescription = styled.div``;

const OuterName = styled.div`
  text-transform: uppercase;
  text-align: center;
`;

class ItemsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: false,
      breed: false,
      age: false,
      weight: false,
      representative: false,
      rescuedBy: false,
      address: false,
      photo: false,
      city: false,
      area: false,
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
    this.props.itemsAry.map(item => {
      if (Number(givenID) === item.id) {
        var {
          name = false,
          breed = false,
          age = false,
          weight = false,
          representative = false,
          photo = false,
          city = false,
          area = false
        } = item;

        if (item.rescuedBy) {
          var { name: rescuedBy, city } = item.rescuedBy;
        }

        this.setState({
          name,
          breed,
          age,
          weight,
          rescuedBy,
          representative,
          photo,
          city: city,
          area,
          isLoading: false
        });
        // these lines are part of the function that will zoom the map
        // and center it when the user clicks on an item, if you want to use it
        // just uncomment these lines
        // setTimeout(() => {
        //   this.props.zoomMap(item.rescuedBy.address);
        // }, 300);
        this.props.setActiveItem(givenID);
      }
      return false;
    });
  }

  handleGoBackBtn = () => {
    this.props.setActiveItem(null);
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
      <ItemDetailsContainer>
        <OuterImage>
          <OuterImage>
            <ItemImg
              src={this.state.photo}
              alt={`${this.state.name} thumbnail`}
            />
          </OuterImage>
          <OuterItemDescription>
            <p>&nbsp;</p>
            <OuterName>
              <h2>{this.state.name}</h2>
            </OuterName>
            <p>&nbsp;</p>
            {this.state.breed && <p>Raza: {this.state.breed}</p>}
            {this.state.age && <p>Edad: {this.state.age} años</p>}
            {this.state.weight && <p>Peso: {this.state.weight} kg</p>}
            {this.state.rescuedBy && <p>Rescatista: {this.state.rescuedBy}</p>}
            {this.state.representative && (
              <p>Refugio a cargo de: {this.state.representative}</p>
            )}
            {this.state.city && <p>Locación: {this.state.city}</p>}
          </OuterItemDescription>
          <p>&nbsp;</p>
          <Link to="../" onClick={this.handleGoBackBtn}>
            <Button componentTxt="VOLVER" />
          </Link>
        </OuterImage>
      </ItemDetailsContainer>
    );
  }
}

export default ItemsDetails;
