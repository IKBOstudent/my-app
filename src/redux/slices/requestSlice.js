import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "request/fetchItems",
  async ({ url_page, url_category, url_sort, url_search }, thunkApi) => {
    var url = "https://62b317614f851f87f453f621.mockapi.io/items?";
    url += url_page + url_category + url_sort + url_search;

    console.log("fetching, ", url);

    const response = await axios.get(url);

    if (response.data.length === 0) {
      thunkApi.rejectWithValue("Empty");
    }
    return thunkApi.fulfillWithValue(response.data);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const requestSlice = createSlice({
  name: "request",
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state, action) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchItems.rejected]: (state, action) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = requestSlice.actions;

export default requestSlice.reducer;
