import { createSlice } from "@reduxjs/toolkit";

const sortNames = ["rating", "price", "title"];

const initialState = {
  categoryId: 0,
  sortType: { sortId: 0, sortProperty: sortNames[0] },
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType.sortId = action.payload;
      state.sortType.sortProperty = sortNames[action.payload];
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setAllFilters(state, action) {
      state.sortType.sortId = sortNames.indexOf(action.payload.sortProperty);
      state.sortType.sortProperty = action.payload.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setAllFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
