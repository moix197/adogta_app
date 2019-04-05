import React from "react";
import { Link } from "@reach/router";

const NavLink = ({ partial = true, ...props }) => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const isActive = partial ? isPartiallyCurrent : isCurrent;
        return {
          className: isActive ? "activeMenuItem" : "false"
        };
      }}
    />
  );
};

export default NavLink;
