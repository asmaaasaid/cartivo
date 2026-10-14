import { Container } from "react-bootstrap";
import Product from "@components/eCommerce/Product/Product";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetProductsByCatPrefix, productsCleanUp } from "@store/products/productsSlice";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import type { TProduct } from "@customTypes/product";
import Heading from "@components/common/Heading/Heading";

const Products = () => {
  const {loading, error, records} = useAppSelector((state)=> state.products);
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItemsId = useAppSelector(state => state.wishlist.itemsId);

    const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return ()=>{
      dispatch(productsCleanUp());
    }
  }, [dispatch, params]);

  return (
    <Container>
      <Heading> {params.prefix} products</Heading>
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