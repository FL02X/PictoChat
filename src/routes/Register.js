import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="text-center p-4 border rounded">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="pb-3 m-0">Sign up</h1>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            User:
                        </div>
                        <div className="col-8 ">
                            <input required type="text" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            Password:
                        </div>
                        <div className="col-8">
                            <input required type="password" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            Confirm password:
                        </div>
                        <div className="col-8">
                            <input required type="password" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            Email:
                        </div>
                        <div className="col-8">
                            <input type="email" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pt-3">
                            <button className="btn btn-secondary w-50">Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 d-flex justify-content-center align-items-center">
                <Link to="/auth/login">
                <button className="btn btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><rect x="30.48" y="12.19" width="1.52" height="7.62" fill="#000000"></rect><rect x="28.95" y="19.81" width="1.53" height="3.05" fill="#000000"></rect><rect x="28.95" y="9.14" width="1.53" height="3.05" fill="#000000"></rect><rect x="27.43" y="22.86" width="1.52" height="3.04" fill="#000000"></rect><rect x="27.43" y="6.09" width="1.52" height="3.05" fill="#000000"></rect><rect x="25.9" y="25.9" width="1.53" height="1.53" fill="#000000"></rect><rect x="25.9" y="4.57" width="1.53" height="1.52" fill="#000000"></rect><rect x="22.86" y="27.43" width="3.04" height="1.52" fill="#000000"></rect><polygon points="24.38 12.19 22.86 12.19 22.86 10.67 13.71 10.67 13.71 7.62 12.19 7.62 12.19 9.14 10.67 9.14 10.67 10.67 9.14 10.67 9.14 12.19 7.62 12.19 7.62 13.71 6.09 13.71 6.09 15.24 7.62 15.24 7.62 16.76 9.14 16.76 9.14 18.29 10.67 18.29 10.67 19.81 12.19 19.81 12.19 21.33 13.71 21.33 13.71 18.29 19.81 18.29 19.81 19.81 21.33 19.81 21.33 21.33 19.81 21.33 19.81 22.86 18.29 22.86 18.29 24.38 21.33 24.38 21.33 22.86 24.38 22.86 24.38 21.33 25.9 21.33 25.9 13.71 24.38 13.71 24.38 12.19" fill="#000000"></polygon><rect x="22.86" y="3.05" width="3.04" height="1.52" fill="#000000"></rect><rect x="19.81" y="28.95" width="3.05" height="1.53" fill="#000000"></rect><rect x="19.81" y="1.52" width="3.05" height="1.53" fill="#000000"></rect><rect x="12.19" y="30.48" width="7.62" height="1.52" fill="#000000"></rect><rect x="12.19" width="7.62" height="1.52" fill="#000000"></rect><rect x="9.14" y="28.95" width="3.05" height="1.53" fill="#000000"></rect><rect x="9.14" y="1.52" width="3.05" height="1.53" fill="#000000"></rect><rect x="6.09" y="27.43" width="3.05" height="1.52" fill="#000000"></rect><rect x="6.09" y="3.05" width="3.05" height="1.52" fill="#000000"></rect><rect x="4.57" y="25.9" width="1.52" height="1.53" fill="#000000"></rect><rect x="4.57" y="4.57" width="1.52" height="1.52" fill="#000000"></rect><rect x="3.05" y="22.86" width="1.52" height="3.04" fill="#000000"></rect><rect x="3.05" y="6.09" width="1.52" height="3.05" fill="#000000"></rect><rect x="1.52" y="19.81" width="1.53" height="3.05" fill="#000000"></rect><rect x="1.52" y="9.14" width="1.53" height="3.05" fill="#000000"></rect><rect y="12.19" width="1.52" height="7.62" fill="#000000"></rect></g></svg>
                    Go back
                </button>
                </Link>
            </div>
        </div>
    );
}

export default Register;