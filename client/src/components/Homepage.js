import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";

import CategoryImage from "./CategoryImage";
import ProductCard from "./ProductCard";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [itemsStatus, setItemsStatus] = useState("");
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
    setItemsStatus("loading");
    fetch(`/api/items?start=${start}&limit=9`) // to retrieve the items of the category above
      .then((res) => res.json())
      .then((res) => {
        setItems(res.data);
        setItemsStatus("active");
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
    return (
      <Loading>
        <CircularProgress /> Loading...
      </Loading>
    );
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
          {itemsStatus == "loading" ? (
            <Loading style={{ margin: "300px 0" }}>
              <CircularProgress /> Loading...
            </Loading>
          ) : (
            <ItemBox>
              {items.map((item) => {
                return <ProductCard key={item._id} item={item} />;
              })}
            </ItemBox>
          )}
        </ItemsPagination>
        <Pages>
          Pages:{" "}
          <ArrowLeft
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

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 25px;
  margin: 100px auto;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
`;
const CategoryContainer = styled.div`
  display: flex;
  padding: 20px;
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
  width: 75vw;
  /* height: 800px; */
  margin: auto;
  padding: 40px;
  border: 5px solid;
  text-align: center;
  border-radius: 10px;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
`;

const Pages = styled.div`
  display: flex;
  padding: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  font-size: 50px;
`;

const ArrowRight = styled(MdArrowForwardIos)`
  cursor: pointer;
`;

const ArrowLeft = styled(MdArrowBackIosNew)`
  cursor: pointer;
  &:disabled {
    filter: grayscale(100%);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
