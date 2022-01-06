import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const SuggestedSearch = ({ allItemsArray, searchValue, setSearchValue }) => {
  // shows only names that contain searchValue
  const matchSuggestions = allItemsArray?.filter((suggestion) => {
    return suggestion.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  // pushes to selected item
  const history = useHistory();

  return (
    <>
      <SearchList>
        {matchSuggestions.map((itemValue) => {
          return (
            <div key={itemValue._id}>
              <ListedItem
                onClick={() => {
                  setSearchValue("");
                  history.push(`/products/${itemValue._id}`);
                }}
              >
                <span>
                  <b>
                    {itemValue.name.slice(
                      0,
                      itemValue.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) + searchValue.length
                    )}
                  </b>
                  <span>
                    {itemValue.name.slice(
                      itemValue.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) +
                        searchValue.length,
                      itemValue.name.length
                    )}
                    <div>{itemValue.category}</div>
                  </span>
                </span>
              </ListedItem>
            </div>
          );
        })}
      </SearchList>
    </>
  );
};

export default SuggestedSearch;

const SearchList = styled.ul`
  border-radius: 3px;
  z-index: 100;
  margin-top: 5px;
  padding: 5px;
  background-color: var(--color-keppel);
  width: 60vw;
  position: absolute;
  box-shadow: 0 5px 5px -4px rgb(0 0 0 / 0.5);
`;

const ListedItem = styled.li`
  padding: 5px;
  &:hover {
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--color-moss-green);
  }
`;
