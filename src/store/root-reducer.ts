import { combineReducers } from "@reduxjs/toolkit";
import { stockApi } from "./stock-api";
import { appSlice, slice } from "./app-slice";




export const rootReducer = combineReducers({
    [stockApi.reducerPath]: stockApi.reducer,
    [slice.app]: appSlice.reducer
    
});

export type RootReducerType = ReturnType<typeof rootReducer>;