import { Col, Row } from "react-bootstrap"
type GridListProps<T> ={
  records: T[];
  renderItem: (record: T)=> React.ReactNode;
}

type HasId = {id?:number}
const GridList =<T extends HasId> ({ records, renderItem }: GridListProps<T>) => {
  const categoriesList =
    records.length > 0
      ? records.map((record) => {
          return (
            <Col
              key={record.id}
              xs={6}
              md={2}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              {renderItem(record)}
            </Col>
          );
        })
      : "ther are no categories";
  return (
    <div>
      <Row className="d-flex justify-content-center ">{categoriesList}</Row>
    </div>
  );
};

export default GridList
