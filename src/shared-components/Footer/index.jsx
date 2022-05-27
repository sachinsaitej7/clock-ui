import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/common/logo-white.svg";

const FooterContainer = styled.div`
  color: ${(props) => props.theme.text.white};
  background-color: ${(props) => props.theme.bg.primary};
  padding: ${(props) => `${props.theme.space[7]} ${props.theme.space[5]}`};
  p {
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    font-size: ${(props) => props.theme.fontSizes[2]};
    lineheight: 20px;
  }
  .company {
    p {
      margin-top: ${(props) => props.theme.space[5]};
      font-weight: ${(props) => props.theme.fontWeights.medium};
    }
    margin-bottom: ${(props) => props.theme.space[8]};
  }
  .meta-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: ${(props) => props.theme.space[5]};
    justify-content: space-evenly;
    p {
      cursor: pointer;
    }
  }
`;

const Company = () => {
  return (
    <div className="company">
      <Logo />
      <p>
        Clock sets the stage for retail fashion stores to showcase their
        inventory to people searching for it nearby.
      </p>
    </div>
  );
};

const MetaLinks = () => {
  return (
    <div className="meta-links">
      <p>Home</p>
      <p>Shipping</p>
      <p>About</p>
      <p>FAQs</p>
      <p>Help</p>
      <p>Terms and Conditions</p>
      <p>Contact Us</p>
      <p>Privacy Policy</p>
    </div>
  );
};

const Footer = () => {
  return (
    <FooterContainer>
      <Company />
      <MetaLinks />
    </FooterContainer>
  );
};

export default Footer;
