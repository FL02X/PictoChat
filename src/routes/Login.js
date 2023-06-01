import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="text-center p-4 border rounded">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="pb-3 m-0">Sign in</h1>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            User:
                        </div>
                        <div className="col-8 ">
                            <input type="text" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            Password:
                        </div>
                        <div className="col-8">
                            <input type="password" className="form-control"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pt-3">
                            <button className="btn btn-secondary w-50">Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
                Or...
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
                <Link className="btn btn-outline-secondary w-25" style={{ textDecoration: "none" }} to="/auth/register">
                        Sign up
                </Link>

            </div>
        </div>
    );
}

export default Login;