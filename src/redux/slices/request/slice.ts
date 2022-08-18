import { createSlice } from "@reduxjs/toolkit";
import { isTemplateSpan } from "typescript";
import { fetchItems } from "./asyncActoins";
import { EStatus, IRequestState } from "./types";

const initialState: IRequestState = {
  items: [],
  status: EStatus.LOADING,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = [];
      state.status = EStatus.LOADING;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      if (state.items.length === 0) {
        state.status = EStatus.EMPTY;
      } else {
        state.status = EStatus.SUCCESS;
      }
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
      state.status = EStatus.ERROR;
    });
  },
});

export const { setItems } = requestSlice.actions;

export default requestSlice.reducer;
