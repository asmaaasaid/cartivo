import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Col, Row } from "react-bootstrap"
type GridListProps<T> ={
  records: T[];
  renderItem: (record: T)=> React.ReactNode;
  typeMessage: string
}

type HasId = {id?:number}
const GridList =<T extends HasId> ({ records, renderItem, typeMessage }: GridListProps<T>) => {
  const categoriesList =
    records.length > 0
      ? records.map((record) => {
          return (
            <Col
              key={record.id}
              sx={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              {renderItem(record)}
            </Col>
          );
        })
      : <LottieHandler type="cartEmptyState" message={typeMessage}/>;
  return (
    <div>
      <Row className="d-flex justify-content-center ">{categoriesList}</Row>
    </div>
  );
};

export default GridList
