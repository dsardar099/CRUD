import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import Error from "./Error";
import Loading from "./Loading";
import { useState,useEffect } from "react";

const View = () => {
  const [reload, setReload] = useState(false);

  const [btnType, setBtnType] = useState(null);

  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const { data, isPending, error } = useFetch(
    "http://localhost:8000/students",
    reload
  );

  const [stdData,setStdData] = useState(null);

  useEffect(() => {

    setStdData(data);

  },[data]);

  // console.log(typeof(stdData));

  const initialDetails = {
    id: null,
    name: "",
    roll: "",
    loc: "",
    course: "",
    grade: "",
    comment: "",
    ph: "",
    email: "",
    adm: "",
    pass: "",
    dev: "",
  };

  const [uStdData, setUStdData] = useState(initialDetails);

  const checkDuplicate = (id) => {
    for (let i = 0; i < stdData.length; i++) {
      if (
        (stdData[i]["roll"] === uStdData["roll"] ||
          stdData[i]["ph"] === uStdData["ph"] ||
          stdData[i]["email"] === uStdData["email"]) &&
        stdData[i]["id"] !== id
      ) {
        return true;
      }
    }
    return false;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUStdData({ ...uStdData, [name]: value });
  };

  const handleSearch = (e) => {
    
    const { name, value } = e.target;
    let filteredData=[];
    for(let i=0;i<data.length;i++){
      let std=data[i];
      if(std['name'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['roll'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['loc'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['course'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['ph'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['email'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['adm'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['pass'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
      else if(std['dev'].toLowerCase().indexOf(value.toLowerCase())===0){
        filteredData.push(std);
      }
    }
    setStdData(filteredData);
    // setStdData(stdData.filter((std) => std.name === value ))
  };

  const handleAdd = (e) => {
    var form = document.querySelector(".needs-validation");
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
          // console.log(uStdData);
          if (!checkDuplicate(-1)) {
            fetch("http://localhost:8000/students/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(uStdData),
            })
              .then((res) => res.json())
              .then((results) => {
                setAlert("Successfully Added");
                setAlertType("Hurray");
                setUStdData(initialDetails);
                history.push("/");
                setReload(reload === false ? true : false);
                window.location.reload();
              });
          } else {
            setAlert("Duplicate Entry");
            setAlertType("Error");
          }
        }
      },
      false
    );
  };

  const handleUpdate = (e) => {
    var form = document.querySelector(".needs-validation");
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
          // console.log(uStdData);
          if (!checkDuplicate(uStdData.id)) {
            fetch("http://localhost:8000/students/" + uStdData.id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(uStdData),
            })
              .then((res) => res.json())
              .then((results) => {
                setAlert("Update Success");
                setAlertType("Hurray");
                setUStdData(initialDetails);
                history.push("/");
                setReload(reload === false ? true : false);
                window.location.reload();
              });
          } else {
            setAlert("Duplicate Entry");
            setAlertType("Error");
          }
        }
      },
      false
    );
  };

  const history = useHistory();

  const handleDelete = (id) => {
    fetch("http://localhost:8000/students/" + id, {
      method: "DELETE",
    }).then(() => {
      // window.location.reload();
      history.push("/");
      setReload(reload === false ? true : false);
    });
  };

  const handleEdit = (id) => {
    setAlert(null);
    const editStd = stdData.filter((s) => s.id === id);
    setUStdData(editStd[0]);
    setBtnType("Update");
  };

  const handleCreate = () => {
    setAlert(null);
    setUStdData(initialDetails);
    setBtnType("Add");
  };

  const handleView = (id) => {
    history.push("/profile/" + id);
  };

  return (
    <>
      {error && <Error error={error} />}
      {isPending && <Loading />}
      {stdData && (
        <>
          {/* Modal */}
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <h5 className="modal-title h4" id="editModalLabel">
                    Edit Student Data
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="continer-fluid">
                    <div className="row justify-content-center">
                      <div className="col-auto">
                        {alert && (
                          <div className="mb-3">
                            <div
                              className="alert alert-info alert-dismissible fade show"
                              role="alert"
                            >
                              <strong>{alertType}!</strong> {alert}
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                              ></button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <form className="row g-3 needs-validation" noValidate>
                      <div className="col-md-4">
                        <label htmlFor="name" className="form-label h6">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={uStdData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="roll" className="form-label h6">
                          Roll No
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="roll"
                          name="roll"
                          value={uStdData.roll}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="loc" className="form-label h6">
                          Location
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="loc"
                          name="loc"
                          value={uStdData.loc}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="course" className="form-label h6">
                          Course
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="course"
                          name="course"
                          value={uStdData.course}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="grade" className="form-label h6">
                          Grade
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="grade"
                          name="grade"
                          value={uStdData.grade}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="dev" className="form-label h6">
                          Devloper
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="dev"
                          name="dev"
                          value={uStdData.dev}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="ph" className="form-label h6">
                          Phone No
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="ph"
                          name="ph"
                          value={uStdData.ph}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="email" className="form-label h6">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={uStdData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="adm" className="form-label h6">
                          Admission Year
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="adm"
                          name="adm"
                          value={uStdData.adm}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="pass" className="form-label h6">
                          Passing Year
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="pass"
                          name="pass"
                          value={uStdData.pass}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="comment" className="form-label h6">
                          Comment
                        </label>
                        <textarea
                          type="number"
                          className="form-control"
                          id="comment"
                          name="comment"
                          value={uStdData.comment}
                          onChange={handleInputChange}
                          rows="4"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Required!</div>
                      </div>

                      <div className="col-12 text-center">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={
                            btnType === "Update" ? handleUpdate : handleAdd
                          }
                        >
                          {btnType}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row pt-3 justify-content-between">
              <div className="col-6 col-md-auto">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={handleCreate}
                >
                  New Student
                </button>
              </div>

              <div className="col-6 col-md-auto">
                <input
                  className="form-control me-2 border border-secondary border-3"
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="row py-3 pb-md-5">
              <div className="col-12 overflow-auto">
                <table className="table table-light table-striped table-hover">
                  <thead>
                    <tr className="table-dark fs-5">
                      <th scope="col">Roll No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Course</th>
                      <th scope="col">Devloper</th>
                      <th scope="col">Phone No</th>
                      <th scope="col">Email</th>
                      <th scope="col">View</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stdData.map((std) => (
                      <tr key={std.id}>
                        <th scope="row">{std.roll}</th>
                        <th>{std.name}</th>
                        <th>{std.course}</th>
                        <th>{std.dev}</th>
                        <th>{std.ph}</th>
                        <th>{std.email}</th>
                        <th className="text-center">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => handleView(std.id)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </th>
                        <th className="text-center">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={() => handleEdit(std.id)}
                          >
                            <i className="fas fa-user-edit"></i>
                          </button>
                        </th>
                        <th className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(std.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default View;
