import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

// Redux 공식 문서에서 권장하는 방식
/** useDispatch는 thunkAction에 대해 불필요한 타입 에러 x */
export const useAppDispatch: () => AppDispatch = useDispatch;
/** 매번 state 타입 지정 x */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
