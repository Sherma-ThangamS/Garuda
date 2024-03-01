import React from "react";
import "./navbar.scss";

function Navbar(){
    return(
        <div className="appbar" >

                <div className="rmklogo">
                    <img src="../../assets/logo.png" alt="RMK logo"></img>
                    <h1 className="clg-title">R.M.K. Engineering College</h1> 
                </div>
            
            <div className="right-logo">
                <img src="../../assets/28yearsup.png" alt="28yrs"></img>
                <img src="../../assets/msclogo.png" alt="2nd logo"></img>
            </div>
            
        </div>
    );
}

export default Navbar;