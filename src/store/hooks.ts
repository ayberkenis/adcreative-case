import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./root";
import { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
