import { height } from '@mui/system'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useDimensions = (width: string, length: string) => {
  let widthFactor = (width == "1") ? 1 : 2;
  let lengthFactor = (length == "1") ? 1 : 2;

  const max = parseInt(width) * widthFactor + parseInt(length) * lengthFactor;
  return { max };
};