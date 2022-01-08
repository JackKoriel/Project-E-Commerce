import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Category from "./Category";
import Companies from "./Companies";
import ProductDetail from "./ProductDetail";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import Footer from "./Footer";
import CartPage from "./CartPage";
import Confirmation from "./Confirmation";
import Header from "./Header";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Main>
          <Header />
          <Fill>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/brands">
                <Companies />
              </Route>
              <Route path="/sign-in">
                <SignIn user={user} setUser={setUser} />
              </Route>
              <Route exact path="/category/:name">
                <Category />
              </Route>
              <Route path="/products/:_id">
                <ProductDetail />
              </Route>
              <Route path="/cartpage">
                <CartPage />
              </Route>
              <Route path="/confirmed">
                <Confirmation />
              </Route>
            </Switch>
          </Fill>
          <Footer />
        </Main>
      </BrowserRouter>
    </>
  );
}

export default App;

const Main = styled.div`
  /* position: relative; */
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Fill = styled.div`
  flex: 1;
  height: auto;
  width: 100%;
`;
