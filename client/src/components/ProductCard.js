import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const ProductCard = ({ item }) => {
  let history = useHistory();

  const handleProductDetailClick = () => {
    history.push(`/products/${item._id}`);
  };

  return (
    <>
      <Container
        onClick={handleProductDetailClick}
        onKeyPress={handleProductDetailClick}
        tabIndex="0"
      >
        <Name>{item.name}</Name>
        <Image src={item.imageSrc} />
        <Price>{item.price}</Price>
      </Container>
    </>
  );
};

export default ProductCard;

const Container = styled.div`
  cursor: pointer;
  width: 200px;
  height: 300px;
  margin: 10px;
  padding: 10px;
  background-color: var(--color-elm);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 0.5);
`;

const Image = styled.img`
  height: 120px;
  border-radius: 10px;
`;

const Name = styled.div`
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  background-color: var(--color-tahuna-sands);
  width: 180px;
`;

const Price = styled.div`
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  background-color: var(--color-keppel);
  color: var(--color-don-juan);
  width: 180px;
`;
