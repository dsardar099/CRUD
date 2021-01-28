const Loading = () => {
  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <div className="col-auto text-center py-md-5">
          <div className="spinner-border text-primary spinner-div" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
