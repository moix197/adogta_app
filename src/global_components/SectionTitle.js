import React from "react";
import styled from "styled-components";

const OuterSectionTitle = styled.div`
  text-align: center;
`;

const SectionTitle = props => {
  return (
    <OuterSectionTitle>
      <h1>{props.content}</h1>
      <p>&nbsp;</p>
    </OuterSectionTitle>
  );
};

export default SectionTitle;
