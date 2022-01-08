import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  let history = useHistory();

  const handleHomePageClick = () => {
    history.push(`/`);
  };

  const handleSignInClick = () => {
    history.push(`/sign-in`);
  };

  const handleCartClick = () => {
    history.push(`/cartpage`);
  };

  return (
    <Wrapper>
      <Container>
        <HomeButton
          onClick={handleHomePageClick}
          onKeyPress={handleHomePageClick}
          tabIndex="0"
        >
          Undefined Export
        </HomeButton>

        <SearchBar />

        <RightSideButtons>
          <SignIn
            onClick={handleSignInClick}
            onKeyPress={handleSignInClick}
            tabIndex="0"
          >
            Sign in
          </SignIn>

          <Cart
            onClick={handleCartClick}
            onKeyPress={handleCartClick}
            tabIndex="0"
          >
            Cart
          </Cart>
        </RightSideButtons>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  flex: 0;
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 0.5);
  background-color: var(--color-elm);
  border-radius: 0 0 3px 3px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  width: 100%;
`;

const HomeButton = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);

  &:active {
    background-color: var(--color-tahuna-sands);
  }
`;

const RightSideButtons = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const SignIn = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);

  &:active {
    background-color: var(--color-tahuna-sands);
  }
`;

const Cart = styled.button`
  font-size: 30px;
  margin: 0 0 0 10px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);

  &:active {
    background-color: var(--color-tahuna-sands);
  }
`;

export default Header;
