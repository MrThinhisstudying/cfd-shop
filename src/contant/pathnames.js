const PRODUCT_PATH = "/product";
const MYACCOUNT_PATH = "/my-account";

export const PATHS = {
  HOME: "/",
  PRODUCT: PRODUCT_PATH,
  PRODUCT_DETAIL: PRODUCT_PATH + "/:slug",
  PRODUCT_CHECKOUT: "/checkout",
  PRODUCT_CART: "/cart",
  MYACCOUNT: {
    INDEX: MYACCOUNT_PATH,
    ORDER: MYACCOUNT_PATH + "/orders",
    ADDRESSES: MYACCOUNT_PATH + "/adresses",
    WHISHLIST: MYACCOUNT_PATH + "/whishlist",
  },
  BLOG: "/blog",
  BLOG_DETAIL: "/blog-detail",
  CONTACT: "/contact",
  ABOUT: "/about",
  FAQ: "/faqs",
  PAYMENTMETHOD: "/payment-method",
  RETURNS: "/returns",
  SHIPPING: "/shipping",
  PRIVACYPOLICY: "/privacy-policy",
};
