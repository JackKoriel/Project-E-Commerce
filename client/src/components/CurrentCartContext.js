import React, { useState, useReducer, createContext, useEffect } from "react";

export const CurrentCartContext = createContext();

const initialState = {
  items: {},
  totalItemNum: 0,
  totalPrice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD-ITEM": {
      return {
        ...state,
        items: {
          ...state.items,
          [action.item._id]: {
            ...action.item,
            quantity:
              state.items[action.item._id] &&
              state.items[action.item._id].quantity
                ? state.items[action.item._id].quantity + 1
                : 1,
          },
        },
      };
    }
    case "UPDATE-ITEM": {
      const { itemId, newQuantity } = action;
      return {
        ...state,
        items: {
          ...state.items,
          [itemId]: {
            ...state.items[itemId],
            quantity: newQuantity,
          },
        },
      };
    }
    case "DELETE-ITEM": {
      const currentID = Number(action.itemId);
      const newCart = { ...state };
      delete newCart.items[currentID];
      return newCart;
    }
    case "CLEAR-CART": {
      return initialState;
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const CurrentCartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(
    reducer,
    JSON.parse(window.sessionStorage.getItem("ItemsInCart")) || initialState
  );

  const [status, setStatus] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const addItems = (item) => {
    dispatch({ type: "ADD-ITEM", item });
  };

  const updateItems = (itemId, newQuantity) => {
    dispatch({ type: "UPDATE-ITEM", itemId, newQuantity });
    // if (newQuantity === 0) {
    //   setStatus("error");
    //   setErrMessage("An item has 0 quantity, please remove or add more.");
    // }
  };

  const deleteItems = (itemId) => {
    dispatch({ type: "DELETE-ITEM", itemId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR-CART" });
  };

  useEffect(() => {
    window.sessionStorage.setItem("ItemsInCart", JSON.stringify(cart));

    return () => {
      window.sessionStorage.setItem("ItemsInCart", JSON.stringify(cart));
    };
  }, [cart]);

  return (
    <CurrentCartContext.Provider
      value={{
        cart,
        dispatch,
        actions: { addItems, updateItems, deleteItems, clearCart },
        status,
        setStatus,
        errMessage,
        setErrMessage,
      }}
    >
      {children}
    </CurrentCartContext.Provider>
  );
};
