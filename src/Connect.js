import React from "react";
import styled from "styled-components";
import Button from "./global_components/Buttons";

const OuterConect = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: #282c34;
  color: #fff;
`;

const ConectCont = styled.div`
  padding: 60px;
  border: 1px solid #61dafb;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 29px 1px rgba(0, 0, 0, 0.75);
`;

const OuterInput = styled.div``;

const Connect = () => {
  return (
    <OuterConect>
      <ConectCont>
        <OuterInput>
          <input type="text" name="user" placeholder="Usuario" />
        </OuterInput>
        <p>&nbsp;</p>
        <OuterInput>
          <input type="password" name="password" placeholder="Clave" />
        </OuterInput>
        <p>&nbsp;</p>
        <Button componentTxt="CONECTARSE" />
      </ConectCont>
    </OuterConect>
  );
};

export default Connect;
