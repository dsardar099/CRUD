const Error = ({error}) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-auto text-center">
                    : Some Error Occured :
                </div>
                <div className="col-auto text-center">
                    {error}
                </div>
            </div>
        </div>
    );
}
 
export default Error;