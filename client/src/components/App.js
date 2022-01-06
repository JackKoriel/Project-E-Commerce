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
          <Footer />
        </Main>
      </BrowserRouter>
    </>
  );
}

export default App;

const Main = styled.div``;
