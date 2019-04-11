import React, { Component } from "react";
import { Router } from "@reach/router";
import Connect from "./Connect";
import LeftBar from "./global_components/LeftBar";
import HomePage from "./HomePage";
import BreedsPage from "./Breeds/BreedsPage";
import PetSection from "./Pets/PetsSection";
import SheltersPage from "./Shelters/SheltersPage";
import { Provider } from ".//SearchContext";
import DogShelterImg from "./images/dog_shelter.png";
import styled from "styled-components";

const MainContentBox = styled.div`
  position: relative;
  width: calc(100% - 107px);
  margin-left: 107px;
  overflow: hidden;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheltersAry: [
        {
          id: 1,
          name: "Proyecto Zarate",
          isShelter: true,
          representative: "Julieta",
          city: "Buenos Aires",
          photo: DogShelterImg,
          address: {
            lat: -34.5515392,
            lng: -58.4014176
          }
        },
        {
          id: 2,
          name: "Proyecto 2",
          isShelter: true,
          representative: "Julieta",
          city: "Buenos Aires",
          photo: DogShelterImg,
          address: {
            lat: -34.1515392,
            lng: -58.8014176
          }
        },
        {
          id: 3,
          name: "Proyecto 3",
          isShelter: true,
          representative: "Julieta",
          city: "Buenos Aires",
          photo: DogShelterImg,
          address: {
            lat: -34.6515392,
            lng: -58.8014176
          }
        }
      ],
      petsAry: [
        {
          id: 1,
          name: "flaco5_2",
          age: 2,
          weight: 5,
          breed: "Mixed",
          rescuedBy: {
            id: 2,
            name: "Proyecto Zarate",
            isShelter: true,
            representative: "Julieta",
            city: "Buenos Aires",
            photo: DogShelterImg,
            address: {
              lat: -34.1515392,
              lng: -58.8014176
            }
          },
          photo:
            "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg"
        },
        {
          id: 2,
          name: "mediano15_10",
          age: 10,
          weight: 15,
          breed: "Mixeda",
          rescuedBy: {
            id: 3,
            name: "Proyecto Zarate",
            isShelter: true,
            representative: "Julieta",
            city: "Buenos Aires",
            photo: DogShelterImg,
            address: {
              lat: -34.6515392,
              lng: -58.8014176
            }
          },
          photo:
            "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg"
        },
        {
          id: 3,
          name: "grande30_1",
          weight: 30,
          age: 1,
          breed: "Mixed",
          rescuedBy: {
            id: 1,
            name: "Proyecto Zarate",
            isShelter: true,
            representative: "Julieta",
            city: "Buenos Aires",
            photo: DogShelterImg,
            address: {
              lat: -34.5515392,
              lng: -58.4014176
            }
          },
          photo:
            "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg"
        },
        {
          id: 4,
          name: "pequeño3_13",
          weight: 3,
          age: 13,
          breed: "Mixeda",
          rescuedBy: {
            id: 2,
            name: "Proyecto Zarate",
            isShelter: true,
            representative: "Julieta",
            city: "Buenos Aires",
            photo: DogShelterImg,
            address: {
              lat: -34.1515392,
              lng: -58.8014176
            }
          },
          photo:
            "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg"
        },
        {
          id: 5,
          name: "Thora1_0.5",
          weight: 1,
          age: 0.5,
          breed: "Mixeda",
          rescuedBy: {
            id: 3,
            name: "Proyecto Zarate",
            isShelter: true,
            representative: "Julieta",
            city: "Buenos Aires",
            photo: DogShelterImg,
            address: {
              lat: -34.6515392,
              lng: -58.8014176
            }
          },
          photo:
            "https://www.guidedogs.org/wp-content/uploads/2015/05/Dog-Im-Not.jpg"
        }
      ],
      filterItems: this.filterItems,
      filterBySize: this.filterBySize
    };
  }

  render() {
    return (
      <div>
        <LeftBar />
        <MainContentBox>
          <Provider value={this.state}>
            <Router>
              <HomePage path="/" />
              <PetSection
                path="adoptar/*"
                title="Listos para adoptar"
                showFilters={true}
                showMap={true}
              />
              <BreedsPage path="razas/*" />
              <SheltersPage path="refugios/*" />
              <Connect path="conectarse" />
            </Router>
          </Provider>
        </MainContentBox>
      </div>
    );
  }
}

export default App;
