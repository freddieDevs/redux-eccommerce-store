import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";


const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
};

//we use createAsyncthunk to fetch data & it takes two arguments the call and a callback func
//we use axios to createe an async function that can also await and there are more args to pass through as well as the thunk
//fetch only fails wen there are network errors
//you can pass props from the components back to the async function as args
export const getCartItems = createAsyncThunk('cart/getCartItems', async(name,thunkAPI)=> {
  try {
    // console.log(respPromise)
    // console.log(name);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const respPromise = await axios(url)
    
    return respPromise.data;
  } catch (error) {
    thunkAPI.rejectWithValue('error.response')
    //errors in axios are located in error.response
  }
}); 

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    //removing an item
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter( (item) => item.id !== itemId)
    },
    //increasing the amount of a particular cartItem
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find( (item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find( (item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach( (item) => {
        amount += item.amount;
        total  += item.amount * item.price;

      });

      state.amount = amount;
      state.total = total;
    },

    // lifecycle actions
  },//immer library sets state and manages it behind the scenes
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending,(state)=> {state.isLoading  = true;
    }).addCase(getCartItems.fulfilled, (state, action) => {state.isLoading = false; state.cartItems = action.payload;}).addCase(getCartItems.rejected, (state, action) => {state.isLoading = false;})
  },
  // extraReducers: {
  //   [getCartItems.pending]: (state)=> {
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]: (state, action) => {
  //     // console.log(action);
  //     state.isLoading = false;
  //     state.cartItems = action.payload;
  //   },
  //   [getCartItems.rejected]: (state, action) => {
  //     state.isLoading = false;
  //   }
  // }
  // above depracated in 2.0 rtk
  // initial state references the properties(initial)
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;

//TODO figure out how to remove the createSlice.extraReducers method as its depraceted and implement 'builder callback notation instead'