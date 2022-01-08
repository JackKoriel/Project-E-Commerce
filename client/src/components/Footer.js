import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Extras>
        <LinkColumn>
          <FooterTag>
            <b>Sell</b>
          </FooterTag>
          <LittleLinks href="#">Sell on undefined</LittleLinks>
          <LittleLinks href="#">Teams</LittleLinks>
          <LittleLinks href="#">Forums</LittleLinks>
          <LittleLinks href="#">Affiliates</LittleLinks>
        </LinkColumn>
        <LinkColumn>
          <FooterTag>
            <b>About</b>
          </FooterTag>
          <LittleLinks href="#">undefined, Inc.</LittleLinks>
          <LittleLinks href="#">Policies</LittleLinks>
          <LittleLinks href="#">Investors</LittleLinks>
          <LittleLinks href="#">Careers</LittleLinks>
        </LinkColumn>
        <LinkColumn>
          <FooterTag>
            <b>Help</b>
          </FooterTag>
          <LittleLinks href="#">Help Center</LittleLinks>
          <LittleLinks href="#">Privacy settings</LittleLinks>
          <LittleLinks href="#">Terms of Use</LittleLinks>
          <LittleLinks href="#">Privacy</LittleLinks>
        </LinkColumn>
      </Extras>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  flex: 0;
  background-color: white;
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-shadow: 0 -5px 5px -4px rgb(0 0 0 / 0.5);
  background-color: var(--color-elm);
  border-radius: 3px 3px 0 0;
`;

const Extras = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LinkColumn = styled.div`
  background-color: var(--color-tahuna-sands);
  padding: 3px 10px;
  border-radius: 3px;
  /* margin-bottom: 10px; */
  display: flex;
  flex-direction: column;
`;

const FooterTag = styled.p`
  color: var(--color-don-juan);
`;

const LittleLinks = styled.a`
  text-decoration: none;
  margin-top: 5px;
  color: var(--color-don-juan);
  font-size: smaller;

  &:hover {
    text-decoration: underline;
  }
`;
