import { Container, Row, Col } from "react-bootstrap";
import Product from "@components/eCommerce/Product/Product";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
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

  const productsList = records.length > 0 ? records.map((record)=>{
    return <Col key={record.id} xs={6} md={3} className="d-flex  justify-content-center mb-5 mt-2">
          <Product {...record}/>
        </Col>
  }) : "ther are no products"
  return (
    <Container>
      <Row className="g-3">
       {productsList}
      </Row>
    </Container>
  );
};

export default Products;