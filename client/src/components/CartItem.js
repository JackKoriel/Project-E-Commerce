import React, { useContext } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
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
      <CloseBtn
        onClick={() => {
          deleteItems(item._id);
        }}
      >
        <FaWindowClose />
      </CloseBtn>
      <ItemContainer>
        <Image src={item.imageSrc} />
        <TitleContainer>
          <Title onClick={() => history.push(`/products/${item._id}`)}>
            {item.name}
          </Title>
          <BodyLocation>{item.body_location}</BodyLocation>
          <Category>{item.category}</Category>
        </TitleContainer>
        <div>
          {item.numInStock > 0 ? (
            <StockText>In Stock</StockText>
          ) : (
            <NoStockText>Not In Stock</NoStockText>
          )}
          <TextInput
            value={itemQuanitity}
            onChange={(ev) => {
              updateItems(item._id, ev.target.value);
            }}
          />
        </div>
        <ItemPrice>{item.price}</ItemPrice>
      </ItemContainer>
      <TotalContainer>Items Total: {item.price}</TotalContainer>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px pink solid;
  width: 95%;
  justify-content: space-between;
  margin: 10px;
`;
const TitleContainer = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  font-weight: 700;
  color: darkblue;
  font-size: 20px;
`;
const Image = styled.img`
  max-width: 200px;
  height: auto;
  /* border: 2px gray solid; */
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Title = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  font-weight: 700;
  color: darkblue;
  font-size: 20px;
  text-align: left;
  padding: 0;
`;
const BodyLocation = styled.div``;
const Category = styled.div``;
const StockText = styled.div`
  font-weight: 700;
  color: darkgreen;
`;
const NoStockText = styled.div`
  font-weight: 700;
  color: darkred;
`;
const ItemPrice = styled.div``;
const TotalContainer = styled.div``;
const CloseBtn = styled.button``;
const TextInput = styled.input``;

export default CartItem;
