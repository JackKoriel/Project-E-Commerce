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
    setStatus("idle");

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

  if (Object.keys(cart.items).length === 0) {
    return <Empty> CART IS EMPTY</Empty>;
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
            <TextCart>
              <p>MY CART</p>
            </TextCart>
            <SaveButton>Save For later</SaveButton>
          </Head>
          <MasterContainer>
            <ContainerLeft>
              {itemsArray.map((item) => {
                return <CartItem key={item._id} item={item} />;
              })}
            </ContainerLeft>
            <ContainerRight>
              <Promo>
                <Input
                  type="text"
                  id="promo"
                  name="promo"
                  placeholder="Promo Code"
                />

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
              {status === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
              <CreditCardContainer>
                <CreditCardTitle>
                  <p>Credit Card Information</p>
                </CreditCardTitle>
                <CreditFeildWrapper>
                  <Text>Card Type</Text>
                  <InputC
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Master or Visa"
                  />
                </CreditFeildWrapper>
                <CreditFeildWrapper>
                  <Text>Credit Card Number</Text>
                  <InputC
                    type="text"
                    id="card"
                    name="card"
                    placeholder="Enter Card 16 Digits"
                    onChange={handleChangeCardNum}
                  />
                </CreditFeildWrapper>
                <CreditFeildWrapper>
                  <Text>Account Holder Name</Text>
                  <InputC
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter fullname"
                    onChange={handleChangeName}
                  />
                </CreditFeildWrapper>
                <CreditFeildWrapper>
                  <Text>Expiration Date</Text>
                  <InputC
                    type="text"
                    id="exp"
                    name="exp"
                    placeholder="Enter expiration"
                    onChange={handleChangeExpiration}
                  />
                </CreditFeildWrapper>
                <CreditFeildWrapper>
                  <Text>Security Number</Text>
                  <InputC
                    type="text"
                    id="sec"
                    name="sec"
                    placeholder="Enter Security 3 Numbers"
                    onChange={handleChangeSecurity}
                  />
                </CreditFeildWrapper>
                <CardButton onClick={(ev) => handlePurchase(ev)}>
                  Confirm Purchase
                </CardButton>
              </CreditCardContainer>
            </ContainerRight>
          </MasterContainer>
        </Master>
      )}
    </>
  );
};

const Empty = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

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
  border: 1px black solid;
  height: 100%;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: var(--color-moss-green);
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 0.5);
  border-bottom: 1px solid var(--color-elm);
`;

const TextCart = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: var(--color-elm);
  color: var(--color-tahuna-sands);
  margin: 10px 10px;
  cursor: default;
`;
const SaveButton = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-elm);
  color: var(--color-tahuna-sands);
  margin: 10px 10px;
  transition: 200ms ease-in-out;
  &:hover {
    background-color: var(--color-don-juan);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  gap: 20%;
  width: 100%;
  height: auto;
`;

const ContainerLeft = styled.div`
  /* border: 1px green solid; */
  display: flex;
  flex-direction: column;
  width: 50%;
  /* justify-content: space-between; */
  align-items: center;
  margin-left: 30px;
  margin-bottom: 20px;
  height: auto;
  gap: 30px;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 30%;
  margin-right: 30px;
  font-size: 20px;
  font-weight: 700;
`;
const Promo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-elm);
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 0.5);
  /* border-bottom: 1px solid var(--color-elm); */
  margin: 0 -30px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const Input = styled.input`
  font-size: 20px;
  padding: 5px 10px;
  margin: 10px 10px;
  border-radius: 3px;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);
`;

const PromoButton = styled.button`
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);
  margin: 10px 10px;
  transition: 200ms ease-in-out;
  &:hover {
    background-color: var(--color-tahuna-sands);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Subtotal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 10px 10px;
`;
const Shipping = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 10px 10px;
`;
const Taxes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 10px 10px;
`;

const CreditCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const CreditCardTitle = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: var(--color-elm);
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 0.5);
  margin-left: -30px;
  margin-right: -30px;
  font-size: 25px;
  font-weight: 700;
  color: var(--color-tahuna-sands);
  border: none;
  padding-left: 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const CreditFeildWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 10px 10px;
`;
const Text = styled.div``;

const InputC = styled.input`
  font-size: 20px;
  padding: 5px 10px;
  margin: 10px 10px;
  border-radius: 3px;
  border: 2px solid var(--color-elm);
`;

const CardButton = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  width: 75%;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-elm);
  color: var(--color-tahuna-sands);
  margin: 10px 60px;
  transition: 200ms ease-in-out;
  &:hover {
    background-color: var(--color-don-juan);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export default CartPage;
