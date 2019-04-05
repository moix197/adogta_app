import React from "react";
import styled from "styled-components";

const OuterBtn = styled.div`
  display: block;
  margin: 20px auto;
  padding: 30px;
  font-size: 2rem;
  background-color: #61dafb;
  text-align: center;
`;

const Button = props => {
  return <OuterBtn>{props.componentTxt}</OuterBtn>;
};

export default Button;
