import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../contant/pathnames";
const HeaderTop = ({ openAuthenModal, onLogout, profile }) => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {profile ? ( //   ==== Logged In ====
            <ul className="top-menu">
              <li>
                <Link to={PATHS.MYACCOUNT.INDEX} className="top-link-menu">
                  <i className="icon-user" />
                  {profile.firstName + " " + profile.lastName === " "
                    ? "Guest"
                    : profile.firstName + " " + profile.lastName}
                </Link>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.MYACCOUNT.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.MYACCOUNT.ORDER}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.MYACCOUNT.WHISHLIST}>
                          Wishlist <span>(3)</span>
                        </Link>
                      </li>
                      <li>
                        <a
                          //   href="#"
                          style={{ cursor: "pointer" }}
                          role="button"
                          onClick={onLogout}
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            // ==== Not Login ====
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  //   href="#signin-modal"
                  //   data-toggle="modal"
                  style={{ cursor: "pointer" }}
                  role="button"
                  className="top-menu-login"
                  onClick={openAuthenModal}
                >
                  <i className="icon-user"></i>Login | Resgister{" "}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
