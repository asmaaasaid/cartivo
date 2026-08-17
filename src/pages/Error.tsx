import { Container, Button } from "react-bootstrap"
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";


const Error = () => {
    const error = useRouteError();
    let errorStatus : number;
    let errorStatusText : string;

    if(isRouteErrorResponse(error)){
        errorStatus = error.status;
        errorStatusText = error.statusText
    } else{
        errorStatus =404;
        errorStatusText = "oops! page vot found "
    }
  return (
    <Container className="text-center">
       <div className="mb-4">
        <i className="fa-solid fa-triangle-exclamation fs-1 text-warning"></i>
      </div>

      <h1 className="display-1 fw-bold text-danger">{errorStatus}</h1>

      <h2 className="fw-bold mb-3">
        {errorStatusText}
      </h2>

      <p className="text-muted mb-4">
        Don't worry, let's get you back on track!
      </p>
      <Link to='/' replace={true}>
      <Button variant="danger">
          Back to Home
        </Button>
      </Link>
      

    </Container>
  );
}

export default Error
