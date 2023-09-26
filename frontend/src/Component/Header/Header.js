import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from "../../image/logo.jpg";
import './Header.css';
const options = {
  navColor1: "white",
  burgerColor: "#1a1718",
  burgerColorHover: "pink",
  link1Text: "Home",
  link2Text: "Product",
  link3Text: "About",
  link4Text: "Contact",
  logo,
  link1Size: "2vmax",
  link2Size: "2vmax",
  link3Size: "2vmax",
  link4Size: "2vmax",
  link1Family: "Poppiens",
  link1Color: "Black",
  link2Color: "Black",
  link3Color: "Black",
  link4Color: "Black",
  link1Padding: "2vmax",
  link2Padding: "2vmax",
  link3Padding: "2vmax",
  link4Padding: "2vmax",
  link1ColorHover: "pink",
  link2ColorHover: "pink",
  link3ColorHover: "pink",
  searchIconMargin: "0.5vmax",
  cartIconMargin: "1vmax",
  profileIconMargin: "0.5vmax",
  searchIconColor: "#121212",
  cartIconColor: "#121212",
  profileIconColor: "#121212",
  searchIconColorHover: "crimson",
  cartIconColorHover: "crimson",
  profileIconColorHover: "crimson",
}
function Header() {
  return (
    <ReactNavbar  {...options}

    />
  )
}

export default Header