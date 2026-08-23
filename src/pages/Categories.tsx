import { Container, Row, Col } from "react-bootstrap";
import Category from "@components/eCommerce/Category/Category";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const {loading, error, records} = useAppSelector(
    (state)=> state.categories
  )
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  const categoriesList = records.length > 0 ? records.map((record)=>{
    return <Col key={record.id} xs={6} md={2} className="d-flex justify-content-center mb-5 mt-2">
          <Category {...record}/>
        </Col>
  }) : "ther are no categories"
  return (
    <Container>
      <Row className="d-flex justify-content-center ">
        {categoriesList}
       
      </Row>
    </Container>
  );
};

export default Categories;