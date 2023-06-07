import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from '../img/pictoLogo.png';
import './Navbar.css'

const Navbar = (props) => {

    const [isLogged, setIsLogged] = useState(false);

    return (
        <div className="pixel-font">
            <div className="pb-1 mb-5 border-bottom shadow" id="top">
                <div className="row pl-3 m-0 pt-1">
                    <div className="col-3">
                    </div>
                    <div className="col-sm-6 text-center">
                        <h1 id="salaText">
                            <img id="logo" src={logo} alt="logo"></img> <mark>PictoChat Web</mark>
                        </h1>
                    </div>
                    <div className="col-3 text-right mt-1">
                    </div>
                </div>
            </div>
            <Outlet />
        </div>

    );
}

export default Navbar;