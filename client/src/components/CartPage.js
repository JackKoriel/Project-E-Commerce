import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaCat } from "react-icons/fa";
import { GiWizardFace } from "react-icons/gi";
import { CircularProgress } from "@mui/material";
// import ConfirmationMsg from "./Confirmation";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import { CurrentCartContext } from "./CurrentCartContext";
import ErrorMsg from "./ErrorMsg";

const CartPage = () => {
  let history = useHistory();

  const {
    cart,
    status,
    setStatus,
    errMessage,
    setErrMessage,
    actions: { clearCart },
  } = useContext(CurrentCartContext);

  // const [errMessage, setErrMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [security, setSecurity] = useState("");
  const [expiration, setExpiration] = useState("");

  const itemsArray = Object.values(cart.items);
  const subtotal = itemsArray.reduce((acc, item) => {
    return acc + Number(item.price?.slice(1)) * item.quantity;
  }, 0);

  const handleChangeCardNum = (event) => {
    setCardNum(event.target.value);
    setErrMessage("");
    setStatus("");
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    setErrMessage("");
    setStatus("");
  };

  const handleChangeSecurity = (event) => {
    setSecurity(event.target.value);
    setErrMessage("");
    setStatus("");
  };

  const handleChangeExpiration = (event) => {
    setExpiration(event.target.value);
    setErrMessage("");
    setStatus("");
  };

  const handlePurchase = (ev) => {
    ev.preventDefault();

    fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        cardNum: cardNum,
        security: security,
        expiration: expiration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setStatus("confirmed");
          history.push(`/confirmed`);
          clearCart();
        } else if (data.status === 400) {
          setStatus("error");
          setErrMessage(data.message);
        }
      })
      .catch((err) => {
        setErrorStatus(true);
      });
  };

  if (errorStatus) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          gap: "30px",
        }}
      >
        <div>
          You broke the page... Cheers! <FaCat size={60} />
        </div>
        <div>
          <GiWizardFace size={60} /> Please refresh the page and try again{" "}
          <GiWizardFace size={60} />
        </div>
      </div>
    );
  }

  return (
    <>
      {status === "idle" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <Master>
          <Head>
            <H1>MY CART</H1>
            <SaveButton>Save Cart</SaveButton>
          </Head>
          <MasterContainer>
            <ContainerLeft>
              {itemsArray.map((item) => {
                return <CartItem key={item._id} item={item} />;
              })}
            </ContainerLeft>
            <ContainerRight>
              <Promo>
                <Input>
                  <input
                    type="text"
                    id="promo"
                    name="promo"
                    placeholder="Promo Code"
                  />
                </Input>
                <PromoButton>Submit</PromoButton>
              </Promo>
              <Subtotal>
                <div>Subtotal:</div>
                <div>${subtotal}</div>
              </Subtotal>
              <Shipping>
                <div>Shipping:</div>
                <div>Included</div>
              </Shipping>
              <Taxes>
                <div>Taxes</div>
                <div>Included</div>
              </Taxes>
            </ContainerRight>
          </MasterContainer>
          <CreditCardContainer>
            <div>
              <Text>Card Type</Text>
              <InputC>
                <input
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Master or Visa"
                />
              </InputC>
            </div>
            <div>
              <Text>Credit Card Number</Text>
              <InputC>
                <input
                  type="text"
                  id="card"
                  name="card"
                  placeholder="Enter Card 16 Digits"
                  onChange={handleChangeCardNum}
                />
              </InputC>
            </div>
            <div>
              <Text>Account Holder Name</Text>
              <InputC>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter fullname"
                  onChange={handleChangeName}
                />
              </InputC>
            </div>
            <div>
              <Text>Expiration Date</Text>
              <InputC>
                <input
                  type="text"
                  id="exp"
                  name="exp"
                  placeholder="Enter expiration"
                  onChange={handleChangeExpiration}
                />
              </InputC>
            </div>
            <div>
              <Text>Security Number</Text>
              <InputC>
                <input
                  type="text"
                  id="sec"
                  name="sec"
                  placeholder="Enter Security 3 Numbers"
                  onChange={handleChangeSecurity}
                />
              </InputC>
            </div>
            <CardButton onClick={(ev) => handlePurchase(ev)}>
              Confirm Purchase
            </CardButton>
          </CreditCardContainer>
          {status === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
        </Master>
      )}
    </>
  );
};

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  margin-top: 200px;
  /* margin-left: 200px; */
`;

const Master = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px black solid; */
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px red solid; */
`;
const H1 = styled.h1``;
const SaveButton = styled.button``;
const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px blue solid; */
  justify-content: space-between;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px green solid; */
  width: 70%;
  margin-left: 20px;
  justify-content: space-between;
  align-items: center;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px green solid; */
  margin-right: 20px;
  width: 400px;
  margin: 10px 10px;
  gap: 30px;
`;
const Promo = styled.div`
  display: flex;
  justify-content: column;
  /* width: 100%; */
`;
const Input = styled.div`
  flex: 2;
`;
const PromoButton = styled.button`
  flex: 1;
`;
const Subtotal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const Shipping = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const Taxes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const CreditCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 50%; */
  /* border: 1px green solid; */
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
`;
const Text = styled.div``;
const InputC = styled.div``;
const CardButton = styled.button``;

export default CartPage;
