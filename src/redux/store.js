import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import requestReducer from './slices/requestSlice';

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        requestReducer,
    },
});
