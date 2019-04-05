import React from "react";
import loadingImage from "../loading.gif";
import { Consumer } from "../SearchContext";
import styled from "styled-components";
import { Link } from "@reach/router";
import Button from "../global_components/Buttons";

const OuterDetails = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: calc(450px - 80px);
  height: calc(100vh - 80px);
  top: 0;
  right: 0;
  padding: 40px;
  color: #fff
  background-color: #282c34;
`;

class BreedDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name.replace(/_/g, " "),
      ageSpawn: null,
      height: null,
      weight: null,
      temperament: null,
      isLoading: true,
      breedsAry: this.props.breedsAry
    };
  }
  componentDidMount() {
    this.props.updateActiveItem();
    this.getSingleBreed();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.breedsAry !== this.props.breedsAry
    ) {
      this.setState(
        {
          name: this.props.name.replace(/_/g, " "),
          breedsAry: this.props.breedsAry,
          isLoading: true
        },
        this.getSingleBreed
      );
    }
  }

  getSingleBreed = () => {
    if (!this.state.breedsAry) return;

    this.state.breedsAry.map(breed => {
      if (breed.name.toLowerCase() === this.state.name.toLowerCase()) {
        this.setState({
          ageSpawn: breed.life_span,
          height: breed.height.metric,
          weight: breed.weight.metric
        });
        this.getTranslation(breed.temperament);
      }
      return false;
    });
  };

  getTranslation = stringToTranslate => {
    let apiKey =
      "trnsl.1.1.20190307T015757Z.69ac9c9de5c56043.06d5ef21b8fa88833abcbcb7e32ace3ab6f29dbd";
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${stringToTranslate}&lang=es`
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          temperament: response.text[0],
          isLoading: false
        });
      });
  };

  render() {
    console.log(this.state);
    if (this.state.isLoading === true) {
      return (
        <OuterDetails>
          <div>
            <img src={loadingImage} alt="loading dog" />
          </div>
        </OuterDetails>
      );
    }
    return (
      <OuterDetails>
        <h1>{this.state.name}</h1>
        <div>
          <p>Edad aproximada: {this.state.ageSpawn}</p>
          <p>Altura aproximada: {this.state.height}</p>
          <p>Peso aproximado: {this.state.weight}</p>
          <p>
            El {this.state.name} es normalmente {this.state.temperament}
          </p>
          <Link to="/razas">
            <Button componentTxt="VOLVER" />
          </Link>
        </div>
      </OuterDetails>
    );
  }
}

export default function BreedDetailsWithContext(props) {
  return <Consumer>{context => <BreedDetails {...props} />}</Consumer>;
}
