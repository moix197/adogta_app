import React from "react";
import loadingImage from "../loading.gif";
import BreedsSection from "./BreedsSection";

class BreedsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breedsAry: null,
      isLoading: false
    };
  }

  render() {
    if (this.state.isLoading) {
      return <img src={loadingImage} alt="Loading dog" />;
    }
    return <BreedsSection title="Todas las Razas" showFilters={true} />;
  }
}

export default BreedsPage;
