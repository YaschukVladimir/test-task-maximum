import { createSlice } from "@reduxjs/toolkit";
import { Model, NameSpace } from "../types/types";

type InitialStateType = {
    choosenModels: Model[];
    selectedMark: string;
    currentPage: number;
}

const initialState: InitialStateType = {
    choosenModels: [],
    selectedMark: '',
    currentPage: 1,
}

export const slice = {
    app: NameSpace.appSlice
  }

export const appSlice = createSlice({
    name: slice.app,
    initialState,
    reducers: {
        setChoosenModels: (state, action) => {
            state.choosenModels = action.payload;
        },
        setSelectedMark: (state, action) => {
            state.selectedMark = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})

export const {
    setSelectedMark,
    setChoosenModels,
    setCurrentPage
} = appSlice.actions;