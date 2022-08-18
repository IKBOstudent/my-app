import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../../utils/cartFromLocalStorage";
import { RootState } from "../../store";
import { ICartState, TCartItem } from "./types";

const LS_cart = getCartFromLS();

const initialState: ICartState = LS_cart;

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const { imageUrl, title, type, size, price } = action.payload;
      const prev_obj_index = state.items.findIndex((obj) => {
        return obj.title === title && obj.type === type && obj.size === size;
      });
      if (prev_obj_index !== -1) {
        state.items[prev_obj_index].amount++;
      } else {
        state.items.push({
          imageUrl,
          title,
          type,
          size,
          price,
          amount: 1,
        });
      }
      state.totalPrice += price;
      state.totalAmount++;
    },

    decrementItemAmount(
      state,
      action: PayloadAction<{
        title: string;
        type: number;
        size: number;
        price: number;
      }>
    ) {
      const { title, type, size, price } = action.payload;
      const prev_obj_index = state.items.findIndex((obj) => {
        return obj.title === title && obj.type === type && obj.size === size;
      });
      if (prev_obj_index !== -1) {
        state.items[prev_obj_index].amount--;
        if (state.items[prev_obj_index].amount === 0) {
          state.items.splice(prev_obj_index, 1);
        }
        state.totalPrice -= price;
        state.totalAmount--;
      }
    },

    removeItem(
      state,
      action: PayloadAction<{
        title: string;
        type: number;
        size: number;
      }>
    ) {
      const { title, type, size } = action.payload;
      const prev_obj_index = state.items.findIndex((obj) => {
        return obj.title === title && obj.type === type && obj.size === size;
      });
      if (prev_obj_index !== -1) {
        state.totalAmount -= state.items[prev_obj_index].amount;
        state.totalPrice -=
          state.items[prev_obj_index].amount *
          state.items[prev_obj_index].price;
        state.items.splice(prev_obj_index, 1);
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;

export const { addItem, decrementItemAmount, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
