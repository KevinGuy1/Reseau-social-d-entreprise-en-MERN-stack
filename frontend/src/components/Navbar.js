import React, { useContext } from "react";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  //   const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img
                src="../../public/Groupomania Logos/icon-left-font.png"
                alt="logo Groupomania"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            {/* <li></li> */}
            <li className="welcome">
              {/* <NavLink exact to="/Connexion"> */}
              <h5>Bienvenue !</h5>
              {/* </NavLink> */}
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/connexion">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;