import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../contant/pathnames";
const HeaderMiddle = () => {
  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler">
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <NavLink to={PATHS.HOME} className="logo">
            <img
              src="src/assets/images/logo.svg"
              alt="Molla Logo"
              width={160}
            />
          </NavLink>
        </div>
        <nav className="main-nav">
          <ul className="menu">
            <li>
              <NavLink end to={PATHS.HOME}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="dropdown cart-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              <span className="cart-count">2</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-cart-products">
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <Link to={PATHS.PRODUCT_DETAIL}>Beige knitted</Link>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span> x $84.00{" "}
                    </span>
                  </div>
                  <figure className="product-image-container">
                    <Link to={PATHS.PRODUCT_DETAIL} className="product-image">
                      <img
                        src="src/assets/images/products/cart/product-1.jpg"
                        alt="product"
                      />
                    </Link>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <Link to={PATHS.PRODUCT_DETAIL}>Blue utility</Link>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span> x $76.00{" "}
                    </span>
                  </div>
                  <figure className="product-image-container">
                    <Link to={PATHS.PRODUCT_DETAIL} className="product-image">
                      <img
                        src="/src/assets/images/products/cart/product-2.jpg"
                        alt="product"
                      />
                    </Link>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
              </div>
              <div className="dropdown-cart-total">
                <span>Total</span>
                <span className="cart-total-price">$160.00</span>
              </div>
              <div className="dropdown-cart-action">
                <Link to={PATHS.PRODUCT_CART} className="btn btn-primary">
                  View Cart
                </Link>
                <Link
                  to={PATHS.PRODUCT_CHECKOUT}
                  className="btn btn-outline-primary-2"
                >
                  <span>Checkout</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
