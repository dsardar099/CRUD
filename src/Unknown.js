import { Link } from 'react-router-dom';
const Unknown = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center py-5">
        <div className="col-auto text-center">
          <div className="text-danger h1">Error 404: Page Not Found</div>
          <div className="text-dark h4 pt-3">
            The page you are looking for does not exist in our system.
            <br/>
            You can visit our home page by clicking below button
          </div>
          <div className="pt-5">
              <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unknown;
