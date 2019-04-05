import React from "react";
import styled from "styled-components";
import NavLink from "./NavLink";

const MenuBtn = styled.div`
  position: relative;
  background-color: #4b4a4a;
  width: 80px;
  height: 80px;
  border-radius: 20%;
  border: 1px solid #000000;
  transition: border-radius 0.5s;
`;

const MenuBtnIcon = styled.img`
  position: absolute;
  width: 36px;
  height: 36px;
  left: calc(50% - 18px);
  top: calc(50% - 25px);
  transition: top 0.5s;
`;

const MenuBtnTxt = styled.span`
  position: absolute;
  text-transform: uppercase;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  transition: opacity 0.3s;
  font-size: 1.3rem;
`;

const SingleLeftBarButton = props => {
  return (
    <NavLink to={`/${props.navName}`}>
      <MenuBtn>
        <MenuBtnIcon src={props.icon} alt={`${props.navName} Botón`} />
        <MenuBtnTxt>{props.navName}</MenuBtnTxt>
      </MenuBtn>
    </NavLink>
  );
};

export default SingleLeftBarButton;
