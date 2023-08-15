import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { useAppDispatch, useAppSelector } from '../../../../hooks/appHooks'
import { setColor } from '../../../../redux/colorPickerSlice';

export default function ColorPicker() {
  const dispatch = useAppDispatch();
  const { showPicker, color } = useAppSelector((state) => state.colorPicker )
  return (
    <div style={{display: showPicker? "block":"none"}}>
        <HexColorPicker className='picker' color = {color} onChange={(color) => (dispatch(setColor(color)) )}/>
    </div>
  )
}
