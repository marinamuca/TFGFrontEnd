import { Button } from '@mui/material';
import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { useAppDispatch, useAppSelector } from '../../../../hooks/appHooks'
import { setColor } from '../../../../redux/colorPickerSlice';

function ColorPicker() {
  const dispatch = useAppDispatch();
  const { showPicker, color } = useAppSelector((state) => state.colorPicker )
  return (
    <div style={{display: showPicker? "block":"none"}}>
        <HexColorPicker className='picker' color = {color} onChange={(color) => (dispatch(setColor(color)) )}/>
        <span className="select">Guardar</span> 
    </div>
  )
}

export default React.memo(ColorPicker)
