import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const CategoryImage = ({ categoryInfo }) => {
  let history = useHistory();

  const handleCategoryClick = () => {
    history.push(`/category/${categoryInfo.name}`);
  };

  return (
    <>
      <Wrapper>
        <Container
          onClick={handleCategoryClick}
          onKeyPress={handleCategoryClick}
          tabIndex="0"
          style={{ backgroundImage: `url(${categoryInfo.imageSrc})` }}
        >
          <CategoryName>{categoryInfo.name}</CategoryName>
        </Container>
      </Wrapper>
    </>
  );
};

export default CategoryImage;

const Wrapper = styled.div``;

const Container = styled.button`
  border: none;
  width: 400px;
  height: 300px;
  background-color: var(--color-keppel);
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;

  &:active {
    box-shadow: none;
  }
`;

const CategoryName = styled.div`
  border-radius: 5px;
  border: 2px solid;
  background-color: var(--color-moss-green);
  color: white;
  font-weight: 700;
  font-size: 40px;
`;
