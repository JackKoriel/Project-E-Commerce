import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CurrentCartContext } from "./CurrentCartContext";
import { CircularProgress } from "@mui/material";

const ProductDetail = () => {
  const {
    actions: { addItems },
    setStatus,
  } = useContext(CurrentCartContext);
  const { _id } = useParams();
  let history = useHistory();

  const [item, setItem] = useState([]);
  const [productStatus, setProductStatus] = useState("loading");
  const [companyStatus, setCompanyStatus] = useState("loading");
  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch(`/api/items/${_id}`)
      .then((res) => res.json())
      .then((res) => {
        setItem(res.data);
        setProductStatus("idle");
      });
  }, [_id]);

  useEffect(() => {
    if (item.companyId) {
      fetch(`/api/companies/${item.companyId}`)
        .then((res) => res.json())
        .then((res) => {
          setCompany(res.data);
          setCompanyStatus("idle");
        });
    }
  }, [item]);

  if (productStatus === "loading" || companyStatus === "loading") {
    return (
      <Loading>
        <CircularProgress /> Loading...
      </Loading>
    );
  }

  return (
    <>
      <Wrapper>
        <Container>
          <Left>
            <Name>{item.name}</Name>
            <ProductImage src={item.imageSrc} />
          </Left>
          <Right>
            <Box>
              <Price>{item.price}</Price>
              <Location>{item.body_location}</Location>
              <Category1>{item.category}</Category1>
              {item.numInStock > 0 ? (
                <StockText>
                  <strong>{item.numInStock}</strong> in Stock
                </StockText>
              ) : (
                <NoStockText>Not In Stock</NoStockText>
              )}
              <CompanyId>Company: {company}</CompanyId>
              <Description>
                <strong>Shipping: </strong> UPS Worldwide Expedited.
                <strong> Located in:</strong> New York, New York, United States.
                <strong> Delivery:</strong> Estimated between 7 ~14 days. Seller
                ships within 3 days after receiving cleared payment.
                <strong> Returns:</strong> Seller does not accept returns.
              </Description>
            </Box>
            {item.numInStock === 0 ? (
              <AddToCart disabled={true} style={{ backgroundColor: "gray" }}>
                ITEM UNAVAILABLE
              </AddToCart>
            ) : (
              <AddToCart
                onClick={(ev) => {
                  addItems({
                    _id: _id,
                    name: item.name,
                    price: item.price,
                    body_location: item.body_location,
                    category: item.category,
                    imageSrc: item.imageSrc,
                    numInStock: item.numInStock,
                  });
                  setStatus("fetched");
                  history.push(`/cartpage`);
                }}
              >
                ADD TO CART
              </AddToCart>
            )}
          </Right>
        </Container>
      </Wrapper>
    </>
  );
};

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 25px;
  margin: 30px auto;
  margin-top: 100px;
`;

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 80%;
`;

const Box = styled.div`
  /* border-radius: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* position: relative; */
  height: 100%;
  margin-left: 10px;
`;
const Left = styled.div`
  border: solid 1px rgba(34, 105, 111, 0.4);
  border-radius: 10px;
  box-shadow: 0px 20px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 60%;
`;

const ProductImage = styled.img`
  display: flex;
  align-items: center;
  padding: 70px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-elm);
  color: white;
  font-size: 32px;
  outline: none;
  height: 200px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 20px;
`;

const Price = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 20px;
`;
const Location = styled.div`
  font-size: 24px;
  margin: 10px;
`;

const Category1 = styled.div`
  font-size: 24px;
  margin: 10px;
`;

const StockText = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: darkgreen;
`;
const NoStockText = styled.div`
  font-weight: 700;
  color: darkred;
`;

const CompanyId = styled.div`
  font-size: 24px;
  margin: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  padding: 10px;
  line-height: 30px;
`;
const AddToCart = styled.button`
  text-decoration: none;
  background-color: var(--color-elm);
  color: white;
  border: none;
  outline: none;
  height: 100px;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: 500ms;
  &:hover {
    background-color: var(--color-moss-green);
    color: var(--color-elm);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  border: solid 1px rgba(34, 105, 111, 0.4);
  border-radius: 10px;
  box-shadow: 0px 20px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export default ProductDetail;
