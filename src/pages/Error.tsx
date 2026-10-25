import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Container className="text-center d-flex justify-content-center align-items-center flex-column">
      <LottieHandler type="notFound"/>
      <p className="text-muted mb-4">
        Don't worry, let's get you back on track!
      </p>
      <Link to="/" replace={true}>
        <Button variant="danger">Back to Home</Button>
      </Link>
    </Container>
  );
};

export default Error;
