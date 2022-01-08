import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestedSearch from "./SuggestedSearch";

const SearchBar = () => {
  // useState for the value inside of search bar
  const [searchValue, setSearchValue] = useState("");

  // stores all items from backend
  const [allItemsArray, setAllItemsArray] = useState([]);

  useEffect(() => {
    fetch("/api/allItems")
      .then((res) => res.json())
      .then((data) => setAllItemsArray(data));
  }, [searchValue]);

  return (
    <>
      <Wrapper>
        <SearchBox
          type="text"
          placeholder="Search for products here"
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
        />
        <SearchButton>Search</SearchButton>
        {searchValue.length >= 2 && (
          <SuggestedSearch
            allItemsArray={allItemsArray.results}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      </Wrapper>
    </>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  position: relative;
`;

const SearchBox = styled.input`
  font-size: 30px;
  width: 60vw;
  margin-right: 5px;
  border: none;
  background-color: var(--color-moss-green);
  padding: 5px;
  padding-left: 10px;
  border-radius: 3px;
`;

const SearchButton = styled.button`
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--color-moss-green);
  color: var(--color-don-juan);

  &:active {
    background-color: var(--color-tahuna-sands);
  }
`;
