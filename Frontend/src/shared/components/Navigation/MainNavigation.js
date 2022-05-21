import react, { useState } from "react";

import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import Button from "../UI/Button/Button";
import CloseIcon from "../Icon/CloseIcon";
import MenuIcon from "../Icon/MenuIcon";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawerHandler = (event) => {
    setIsDrawerOpen(true);
  };
  const closeDrawerHandler = (event) => {
    setIsDrawerOpen(false);
  };

  return (
    <react.Fragment>
      {
        <SideDrawer active={isDrawerOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks onClick={closeDrawerHandler} />
          </nav>
          <Button
            className="main-navigation btn-close"
            onClick={closeDrawerHandler}
          >
            <CloseIcon width="40px" height="40px" />
          </Button>
        </SideDrawer>
      }

      <MainHeader>
        <h2 className="main-navigation__header-heading">E-Saving</h2>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <Button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <MenuIcon />
        </Button>
      </MainHeader>
    </react.Fragment>
  );
};

export default MainNavigation;
