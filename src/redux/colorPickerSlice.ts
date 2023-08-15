import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ColorPickerState {
  showPicker: boolean;
  color: string;
}

const initialState: ColorPickerState = {
  showPicker: false,
  color: "#ffffff",
};

const colorPickerSlice = createSlice({
    name: 'colorPicker',
    initialState,
    reducers: {
        showPicker: (state) => {
            state.showPicker = !state.showPicker;
        },
        setColor: (state, action: PayloadAction<string>) =>{
            state.color = action.payload;
        },

    }
});

export const { showPicker, setColor } = colorPickerSlice.actions;
export const selectShowPicker = (state: RootState) => state.colorPicker.showPicker
export const selectColor = (state: RootState) => state.colorPicker.color

export default colorPickerSlice.reducer