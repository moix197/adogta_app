import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

import HomeImage from "../images/bar_home_img.png";
import AdoptImage from "../images/bar_adopt_img.png";
import BreedsImage from "../images/bar_breeds_img.png";
import SingleLeftBarButton from "./SingleLeftBarButton";

const LeftMenuBar = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 0.082fr;
  position: fixed;
  width: 105px;
  left: 0;
  top: 0;
  height: 100%;
  color: #fff;
  background-color: #282c34;
  border-right: 2px solid #61dafb;
  overflow: hidden;
  padding: 20px 0;
  text-align: center;
  z-index: 999;
  -webkit-box-shadow: -6px 2px 22px 2px rgba(71, 71, 71, 1);
  -moz-box-shadow: -6px 2px 22px 2px rgba(71, 71, 71, 1);
  box-shadow: -6px 2px 22px 2px rgba(71, 71, 71, 1);
`;

const OuterMenuBtns = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  position: relative;
  margin: 0 auto;
  background-color: #4b4a4a;
  width: 80px;
  height: 80px;
  border-radius: 20%;
  border: 1px solid #000000;
  transition: border-radius 0.5s;
`;

const MenuHeader = styled.div``;

const MenuTitle = styled.h3`
  font-size: 2rem;
  line-height: 2.2rem;
`;

const MenuBtnConnect = styled.button`
  width: 100%;
  padding: 20px 0;
  text-transform: uppercase;
  font-size: 1.3rem;
  color: #000;
  font-weight: bold;
  background-color: #61dafb;
`;

const navButtonsAry = [
  { navName: "inicio", icon: HomeImage },
  { navName: "adoptar", icon: AdoptImage },
  { navName: "refugios", icon: BreedsImage },
  { navName: "razas", icon: BreedsImage }
];
class LeftBar extends React.Component {
  render() {
    return (
      <LeftMenuBar>
        <MenuHeader>
          <Link to="/">
            <MenuTitle>My New App</MenuTitle>
          </Link>
        </MenuHeader>
        <OuterMenuBtns>
          {navButtonsAry.map(item => {
            return (
              <SingleLeftBarButton
                key={item.navName}
                navName={item.navName}
                icon={item.icon}
              />
            );
          })}
        </OuterMenuBtns>
        <div>
          <Link to="/conectarse">
            <MenuBtnConnect>Conectarse</MenuBtnConnect>
          </Link>
        </div>
      </LeftMenuBar>
    );
  }
}

export default LeftBar;
