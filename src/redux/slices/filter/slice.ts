import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterState, sortNames } from "./types";

const initialState: IFilterState = {
  categoryId: 0,
  sort: { sortId: 0, sortProperty: sortNames[0] },
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
      state.sort.sortId = action.payload;
      state.sort.sortProperty = sortNames[action.payload];
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setAllFilters(state, action: PayloadAction<Record<string, string>>) {
      state.sort.sortId = sortNames.indexOf(action.payload.sortProperty);
      state.sort.sortProperty = action.payload.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setAllFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
