import React, { useContext } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CurrentCartContext } from "./CurrentCartContext";
import { useHistory } from "react-router-dom";

const CartItem = ({ item }) => {
  let history = useHistory();
  const {
    cart,
    // setStatus,
    // setErrMessage,
    actions: { updateItems, deleteItems },
  } = useContext(CurrentCartContext);
  const itemQuanitity = cart.items[item._id]?.quantity;
  // if (itemQuanitity === 0) {
  //   setStatus("error");
  //   setErrMessage(
  //     "An item has 0 quantity, please remove or add more."
  //   );
  // }
  return (
    <Master>
      <TopDiv>
        <CloseBtn
          onClick={() => {
            deleteItems(item._id);
          }}
        >
          <AiOutlineCloseCircle size={25} />
        </CloseBtn>
      </TopDiv>
      <ItemContainer>
        <ImageContainer>
          <Image src={item.imageSrc} />
        </ImageContainer>
        <TitleContainer>
          <Title onClick={() => history.push(`/products/${item._id}`)}>
            {item.name}
          </Title>
          <BodyLocation>{item.body_location}</BodyLocation>
          <Category>{item.category}</Category>
        </TitleContainer>
        <StockContainer>
          {item.numInStock > 0 ? (
            <StockText>In Stock</StockText>
          ) : (
            <NoStockText>Not In Stock</NoStockText>
          )}
          <InputContainer>
            <p>QT</p>
            <InputFeild
              value={itemQuanitity}
              onChange={(ev) => {
                updateItems(item._id, ev.target.value);
              }}
            />
          </InputContainer>
        </StockContainer>
        <ItemPrice>{item.price}</ItemPrice>
      </ItemContainer>
      <TotalContainer>Items Total: {item.price}</TotalContainer>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  border: solid 1px rgba(34, 105, 111, 0.4);
  border-radius: 10px;
  box-shadow: 0px 20px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px pink solid;
  width: 100%;
  /* justify-content: space-between; */
  height: 50%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
`;
const Image = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  width: 50%;
  height: 100%;
  line-height: 25px;
  gap: 5px;
`;

const Title = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  text-align: left;
  padding-left: 0;
  line-height: 25px;
  word-break: break-word;
  transition: 200ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    background-color: var(--color-tahuna-sands);
    border-radius: 5px;
  }
`;
const BodyLocation = styled.div`
  font-size: 17px;
  font-style: italic;
`;
const Category = styled.div`
  font-size: 17px;
  font-style: italic;
`;

const StockContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 15%;
  padding-left: 10px;
`;
const StockText = styled.div`
  font-weight: 700;
  color: darkgreen;
`;
const NoStockText = styled.div`
  font-weight: 700;
  color: darkred;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-weight: 700;
  align-items: center;
`;
const InputFeild = styled.input`
  width: 30%;
  padding-left: 5px;
`;

const ItemPrice = styled.div`
  width: 10%;
  margin-top: 10px;
  text-align: center;
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-elm);
  color: white;
  height: 25%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 15px;
`;

const TopDiv = styled.div`
  position: relative;
  background-color: var(--color-elm);
  height: 25%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: white;
  & :hover {
    color: darkred;
    cursor: pointer;
  }
`;

export default CartItem;
