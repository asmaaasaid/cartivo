import { Container } from "react-bootstrap";
import Product from "@components/eCommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import type { TProduct } from "@customTypes/product";
import Heading from "@components/common/Heading/Heading";
import useProducts from "@hooks/useProducts";

const Products = () => {
 const {loading, error, productsFullInfo, productPrefix} = useProducts()
  return (
    <Container>
      <Heading title = {`${productPrefix} products`}/> 
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;