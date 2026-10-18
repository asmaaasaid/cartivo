import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  categoriesFullInfoCleanUp,
} from "@store/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories,
  );
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(categoriesFullInfoCleanUp());
      promise.abort()
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useCategories;
