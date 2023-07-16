import { useMainContext } from "../MainContext";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/reducers/authReducer";
import { message } from "antd";
import { clearCart, updateCart } from "../../store/reducers/cartReducer";
import { CART_MESSAGE, GENERAL_MESSAGE } from "../../contant/message";

const useHeader = () => {
  const { openAuthenModal } = useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authAction.logout());
    dispatch(clearCart());
    message.success("Đăng xuất thành công");
  };
  const headerProps = {
    openAuthenModal,
    profile,
    onLogout,
  };

  //Handle middle props
  const onRemoveProduct = async (removeProductId) => {
    if (removeProductId) {
      let newPayload = {};
      const removeIndex = cartInfo.product?.findIndex(
        (product) => product.id === removeProductId
      );
      if (removeIndex > -1) {
        const newProductPayload = cartInfo.product?.filter(
          (_, index) => index !== removeIndex
        );
        const newQuantityPayload = cartInfo.quantity?.filter(
          (_, index) => index !== removeIndex
        );
        newPayload = {
          ...cartInfo,
          product: newProductPayload.map((product) => product.id),
          quantity: newQuantityPayload,
          subTotal: 0,
          total: 0,
          totalProduct: ["string"],
        };
        const res = await dispatch(updateCart(newPayload)).unwrap();
        if (res.id) {
          message.success(CART_MESSAGE.removeSuccesss);
        }
      } else {
        message.error(GENERAL_MESSAGE.error);
      }
    }
  };
  const headerMiddleProps = {
    products: cartInfo.product?.map((product, index) => {
      return {
        ...product,
        quantity: cartInfo.quantity?.[index] || "1",
      };
    }),
    total: cartInfo.total,
    totalProduct: Number(cartInfo.totalProduct?.[0]) || 0,
    onRemoveProduct,
  };

  return {
    headerProps,
    headerMiddleProps,
  };
};

export default useHeader;
