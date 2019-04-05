import React from "react";
import PetSection from "./Pets/PetsSection";
import BreedsSection from "./Breeds/BreedsSection";
import ShelterSection from "./Shelters/ShelterSection";

const HomePage = props => {
  return (
    <div>
      <div className="outerSinglePageSections">
        <PetSection title="En Adopción" showMap={false} />
        <ShelterSection title="Refugios" showMap={false} />
        <BreedsSection limit={8} title="Razas" />
      </div>
    </div>
  );
};

export default HomePage;
