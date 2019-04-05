import React from "react";
import PetSection from "./PetsSection";

const AdoptPage = props => {
  return (
    <div>
      <PetSection
        title="Listos para adoptar"
        showFilters={true}
        showMap={true}
      />
    </div>
  );
};

export default AdoptPage;
