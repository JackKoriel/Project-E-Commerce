import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";

import CategoryImage from "./CategoryImage";
import ProductCard from "./ProductCard";

import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(() => {
    // get all categories
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setCategoriesStatus("idle");
      });
  }, []);

  useEffect(() => {
    fetch(`/api/items?start=${start}&limit=9`) // to retrieve the items of the category above
      .then((res) => res.json())
      .then((res) => {
        setItems(res.data);
      });
  }, [start]);

  const handleNextPageClick = () => {
    if (pageNumber < 39) {
      setPageNumber(pageNumber + 1);
      setStart(start + 9);
    }
  };

  const handleLastPageClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setStart(start - 9);
    }
  };

  if (categoriesStatus === "loading") {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      <Container>
        <CategoryContainer>
          {categories.map((el, index) => {
            return <CategoryImage key={index} categoryInfo={el} />;
          })}
        </CategoryContainer>
        <ItemsPagination>
          <Title>🔥Today's Deals🔥</Title>
          <ItemBox>
            {items.map((item) => {
              return <ProductCard key={item._id} item={item} />;
            })}
          </ItemBox>
        </ItemsPagination>
        <Pages>
          Pages:{" "}
          <ArrowLeft
            // disabled={pageNumber === 1 ? true : false}
            onClick={handleLastPageClick}
            onKeyPress={handleLastPageClick}
            tabIndex="0"
          />{" "}
          {pageNumber}{" "}
          <ArrowRight
            onClick={handleNextPageClick}
            onKeyPress={handleNextPageClick}
            tabIndex="0"
          />
        </Pages>
      </Container>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div``;
const Container = styled.div`
  border: 2px solid;
`;
const CategoryContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 60px;
`;

const Title = styled.span`
  font-size: 50px;
  text-align: center;
`;

const ItemsPagination = styled.div`
  width: 60vw;
  margin: auto;
  padding: 40px;
  border: 5px solid;
  text-align: center;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Pages = styled.div`
  display: flex;
  padding: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 50px;
`;

const ArrowRight = styled(FiArrowRight)`
  cursor: pointer;
`;

const ArrowLeft = styled(FiArrowLeft)`
  cursor: pointer;
  &:disabled {
    filter: grayscale(100%);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
