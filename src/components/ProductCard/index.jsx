import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { PATHS } from "../../contant/pathnames";
import { Empty, message } from "antd";
import { formatCurrency } from "../../utils/format";
import { useMainContext } from "../MainContext";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthen } from "../../utils/checkAuthen";
import { THUNK_STATUS } from "../../contant/thunkStatus";
import { CART_MESSAGE, GENERAL_MESSAGE } from "../../contant/message";
import { updateCart } from "../../store/reducers/cartReducer";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const { id, slug, title, price, rating, images } = product || {};
  const { openAuthenModal } = useMainContext();
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onAddToCart = async () => {
    const isLogin = checkAuthen();
    if (!isLogin) {
      openAuthenModal();
    } else if (id && updateStatus !== THUNK_STATUS.pending) {
      try {
        let addPayLoad = {};
        if (cartInfo.id) {
          const matchIndex = cartInfo.product?.findIndex(
            (product) => product.id === id
          );
          const newProductPayload = cartInfo.product?.map((product) => {
            return product.id;
          });
          const newQuantityPayload = [...cartInfo.quantity];
          if (matchIndex > -1) {
            newQuantityPayload[matchIndex] = (
              Number(newQuantityPayload[matchIndex]) + 1
            ).toString();
          } else {
            newProductPayload.push(id);
            newQuantityPayload.push("1");
          }
          addPayLoad = {
            ...cartInfo,
            product: newProductPayload,
            quantity: newQuantityPayload,
          };
        } else {
          addPayLoad = {
            product: [id],
            quantity: ["1"],
            subTotal: 0,
            totalProduct: ["string"],
            discound: 0,
            paymentMethod: "string",
          };
        }
        const res = await dispatch(updateCart(addPayLoad)).unwrap();
        if (res.id) {
          message.success(CART_MESSAGE.atcSuccesss);
        }
      } catch (error) {
        console.log("error: ", error);
        message.error(GENERAL_MESSAGE.error);
      }
    }
  };
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
          <a
            role="button"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={onAddToCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={PATHS.PRODUCT + `/${slug}`}>{title || ""}</Link>
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
