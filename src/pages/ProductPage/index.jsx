import React from "react";
import ProductToolbox from "./ProductToolbox";
import ProductList from "./ProductList";
import Pagination from "../../components/Pagination";
import ProductFilter from "./ProductFilter";
import { Link } from "react-router-dom";
import { PATHS } from "../../contant/pathnames";
import useProductPage from "./useProductPage";
import Breadcrumb from "../../components/Breadcrumb";

const ProductPage = () => {
  const { pagiProps, productListProps, toolboxProps, filterProps } =
    useProductPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("/src/assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps} />
              {/* {page === 1 ? "" : <Pagination {...pagiProps} />} */}
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
