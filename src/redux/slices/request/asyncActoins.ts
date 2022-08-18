import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TPizza } from "./types";
export const fetchItems = createAsyncThunk<TPizza[], Record<string, string>>(
  "request/fetchItems",
  async (params) => {
    const { url_page, url_category, url_sort, url_search } = params;
    var url = "https://62b317614f851f87f453f621.mockapi.io/items?";
    url += url_page + url_category + url_sort + url_search;

    console.log("fetching, ", url);

    const response = await axios.get<TPizza[]>(url);
    return response.data;
  }
);
