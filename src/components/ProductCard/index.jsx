import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { PATHS } from "../../contant/pathnames";
import { Empty } from "antd";
import { formatCurrency } from "../../utils/format";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const { slug, title, price, rating, images } = product || {};
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={PATHS.PRODUCT + `/${slug}`} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a href="#" className="btn-product btn-cart" title="Add to cart">
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <a href="product-detail.html">{title}</a>
        </h3>
        <div className="product-price"> ${formatCurrency(price || 0)}</div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 20}` }}
            />
          </div>
          <span className="ratings-text">( 11 Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
