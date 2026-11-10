import { Col, ListGroup, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <Row>
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item as={NavLink} to="" end>
            account info
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="orders">
            orders
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
