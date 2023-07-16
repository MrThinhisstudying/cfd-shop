import { THUNK_STATUS } from "../../contant/thunkStatus";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartServices } from "../../services/cartService";

const initialState = {
  cartInfo: {},
  updateStatus: THUNK_STATUS.fulfilled,
  getStatus: THUNK_STATUS.fulfilled,
};
export const { reducer: cartReducer, actions: cartAction } = createSlice({
  initialState,
  name: "cart",
  reducers: {
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    //Get Cart
    builder.addCase(getCart.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.getStatus = THUNK_STATUS.rejected;
      state.cartInfo = {};
    });

    //Update
    builder.addCase(updateCart.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(updateCart.fulfilled, (state) => {
      state.updateStatus = THUNK_STATUS.fulfilled;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.rejected;
    });
  },
});

export const { clearCart } = cartAction;

export const getCart = createAsyncThunk("cart/get", async (_, thunkApi) => {
  try {
    const cartRes = await cartServices.getCart();
    const cartInfo = { ...cartRes.data?.data };

    //Tùy vào mỗi dự án sẽ khác nhau. CÓ dự án thì FE làm có dự án thì BE làm
    const subTotal = cartInfo.quantity?.reduce((current, next, index) => {
      return (
        current + Number(next) * Number(cartInfo.product?.[index].price || 0)
      );
    }, 0);

    const total = subTotal - subTotal * ((cartInfo.discount || 0) / 100);
    const totalProduct =
      cartInfo.quantity?.reduce(
        (current, next) => Number(current) + Number(next),
        0
      ) || "0";
    const modCartInfo = {
      ...cartInfo,
      total,
      subTotal,
      totalProduct: [totalProduct.toString()],
    };
    thunkApi.fulfillWithValue(modCartInfo);
    return modCartInfo;
  } catch (error) {
    thunkApi.rejectWithValue(error);
    throw error;
  }
});

export const updateCart = createAsyncThunk(
  "cart/update",
  async (actionPayload, thunkApi) => {
    try {
      const cartRes = await cartServices.updateCart({
        ...actionPayload,
        subTotal: 0,
        total: 0,
        totalProduct: ["string"],
        discount: 0,
        paymentMethod: "string",
      });
      const cartInfo = cartRes.data.data;
      thunkApi.dispatch(getCart());
      thunkApi.fulfillWithValue(cartInfo);
      return cartInfo;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      throw error;
    }
  }
);
