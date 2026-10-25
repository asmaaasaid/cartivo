import { Container } from "react-bootstrap";
import Category from "@components/eCommerce/Category/Category";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";
import useCategories from "@hooks/useCategories";
import type { TCategory } from "@customTypes/category";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <Container>
      <Heading title="categories" />
      <Loading loading={loading} error={error}>
        <GridList<TCategory>
        typeMessage='there are no categories'
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
