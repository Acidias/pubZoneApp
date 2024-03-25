// context/CartContext.js
import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [{
     id: 1,
     name: 'Beer',
     price: 5.99,
     quantity: 1,
  }],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists
      const existItem = state.items.find(item => item.id === action.payload.id);
      if (existItem) {
        // Increase the quantity
        return {
          ...state,
          items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item),
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return initialState;
    // Add other actions (e.g., increase/decrease quantity) as needed
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
