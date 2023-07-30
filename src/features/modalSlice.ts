import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ModalState {
    isOpen: boolean,
    title: string,
    content: JSX.Element | null
}

const initialState: ModalState = {
    isOpen: false,
    title: "",
    content: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = "";
            state.content = null;
        },
        setTitle: (state, action: PayloadAction<string>) =>{
            state.title = action.payload;
        },
        setContent: (state, action: PayloadAction<JSX.Element>) => {
            state.content = action.payload;
        },
    }
});

export const { openModal, closeModal, setTitle, setContent } = modalSlice.actions;
export const selectOpen = (state: RootState) => state.modal.isOpen
export const selectTitle = (state: RootState) => state.modal.title
export const selectContent = (state: RootState) => state.modal.content
export default modalSlice.reducer