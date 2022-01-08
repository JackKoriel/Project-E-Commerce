import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";

import ProductCard from "./ProductCard";

const Category = () => {
  const { name } = useParams();

  const [chosenCategory, setChosenCategory] = useState(null);
  const [categoryStatus, setCategoryStatus] = useState("loading");

  const [itemsOfCategory, setitemsOfCategory] = useState([]);
  const [itemsStatus, setItemsStatus] = useState("loading");

  useEffect(() => {
    fetch(`/api/categories/${name}`) // to retrieve the correct category
      .then((res) => res.json())
      .then((res) => {
        setChosenCategory(res.data);
        setCategoryStatus("idle");
      });
  }, [name]);

  useEffect(() => {
    fetch(`/api/category?type=${name}`) // to retrieve the items of the category above
      .then((res) => res.json())
      .then((res) => {
        setitemsOfCategory(res.data);
        setItemsStatus("idle");
      });
  }, [name]);

  // I need to use a req.query to get the items per category!

  if (categoryStatus === "loading" || itemsStatus === "loading") {
    return (
      <Loading>
        <CircularProgress /> Loading...
      </Loading>
    );
  }

  return (
    <Wrapper>
      <Container>
        {itemsOfCategory.map((item) => {
          return <ProductCard key={item._id} item={item} />;
        })}
      </Container>
    </Wrapper>
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
  /* height: 80vh; */
`;

const Container = styled.div`
  /* height: 80vh; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  /* overflow-y: scroll; */
`;

export default Category;
