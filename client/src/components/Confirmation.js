import React from "react";
import styled from "styled-components";

const ConfirmationMsg = () => (
  <Wrapper>
    <p>Thanks for ordering!</p>
    <p>Your order will be sent to your home in few days.</p>
    <p>Thanks again!</p>
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

export default ConfirmationMsg;
