import { Container } from "react-bootstrap";
import Product from "@components/eCommerce/Product/Product";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";

const Products = () => {
  const {loading, error, records} = useAppSelector((state)=> state.products)
  const params = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return ()=>{
      dispatch(productsCleanUp());
    }
  }, [dispatch, params]);

  return (
    <Container>
      <Loading status={loading} error={error}>
        
       <GridList records={records} renderItem={(record)=>  <Product {...record}/> } /> 
      </Loading>
      
    </Container>
  );
};

export default Products;