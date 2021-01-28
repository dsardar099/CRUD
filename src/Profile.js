import { useHistory, useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import useFetch from "./useFetch";

const Profile = () => {
  const { id } = useParams();
  const { data: stdData, isPending, error } = useFetch(
    "http://localhost:8000/students/" + id,
    true
  );

  const history = useHistory();

  const handleBack = () => {
    history.push("/");
  };

  return (
    <>
      {isPending && <Loading />}
      {error && <Error error={error} />}
      {stdData && (
        <div className="container">
          <div className="row justify-content-center my-2">
            <div className="col-12 text-center h2 text-light bg-primary py-2">
              Student Profile
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Name: </span>
              <span className="fs-4">{stdData.name}</span>
            </div>
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Roll No: </span>
              <span className="fs-4">{stdData.roll}</span>
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Location: </span>
              <span className="fs-4">{stdData.loc}</span>
            </div>
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Course: </span>
              <span className="fs-4">{stdData.course}</span>
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Phone No: </span>
              <span className="fs-4">{stdData.ph}</span>
            </div>
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Email: </span>
              <span className="fs-4">{stdData.email}</span>
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Admission Year: </span>
              <span className="fs-4">{stdData.adm}</span>
            </div>
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Passing Year: </span>
              <span className="fs-4">{stdData.pass}</span>
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Grade: </span>
              <span className="fs-4">{stdData.grade}</span>
            </div>
            <div className="col-12 col-md-6 border border-warning border-3">
              <span className="h3">Developer: </span>
              <span className="fs-4">{stdData.dev}</span>
            </div>
          </div>
          <div className="row justify-content-center bg-dark text-light">
            <div className="col-12 col-md-8 py-3">
              <div className="fs-4 py-3">{stdData.comment}</div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-12 text-center pt-5">
              <button className="btn btn-danger fw-bold" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
