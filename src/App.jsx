import { Route, Routes } from "react-router-dom";
import { PATHS } from "./contant/pathnames";
import { Suspense, lazy } from "react";
import PageLoading from "./components/LoadingPage";
import PrivateRoute from "./components/PrivateRoute";
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductCart = lazy(() => import("./pages/ProductCart"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const FAQPage = lazy(() => import("./pages/FaqPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const ReturnsPage = lazy(() => import("./pages/Returns"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const MyAccountLayout = lazy(() => import("./layouts/MyAccountLayout"));
const DashBoardPage = lazy(() => import("./pages/DashBoardPage"));
const MyOrder = lazy(() => import("./pages/DashBoardPage/MyOrder"));
const MyAccount = lazy(() => import("./pages/DashBoardPage/MyAccount"));
const MyAddresses = lazy(() => import("./pages/DashBoardPage/MyAddresses"));
const MyWhishlist = lazy(() => import("./pages/DashBoardPage/MyWhishlist"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));

function App() {
  return (
    <Suspense lazy={<PageLoading />}>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path={PATHS.CONTACT} element={<ContactPage />}></Route>
          <Route path={PATHS.PRODUCT} element={<ProductPage />}></Route>
          <Route
            path={PATHS.PRODUCT_DETAIL}
            element={<ProductDetail />}
          ></Route>
          <Route
            path={PATHS.PRODUCT_CHECKOUT}
            element={<CheckoutPage />}
          ></Route>
          <Route path={PATHS.PRODUCT_CART} element={<ProductCart />}></Route>
          <Route path={PATHS.ABOUT} element={<AboutPage />}></Route>
          <Route path={PATHS.BLOG} element={<BlogPage />}></Route>
          <Route path={PATHS.BLOG_DETAIL} element={<BlogDetail />}></Route>
          <Route path={PATHS.FAQ} element={<FAQPage />}></Route>
          <Route path={PATHS.PRIVACYPOLICY} element={<PrivacyPage />}></Route>
          <Route path={PATHS.RETURNS} element={<ReturnsPage />}></Route>
          <Route path={PATHS.SHIPPING} element={<ShippingPage />}></Route>
          <Route
            path={PATHS.PAYMENTMETHOD}
            element={<PaymentMethodPage />}
          ></Route>
          <Route element={<PrivateRoute redirecPath={PATHS.HOME} />}>
            <Route path={PATHS.MYACCOUNT.INDEX} element={<MyAccountLayout />}>
              <Route index element={<MyAccount />}></Route>
              <Route path={PATHS.MYACCOUNT.ORDER} element={<MyOrder />}></Route>
              <Route
                path={PATHS.MYACCOUNT.ADDRESSES}
                element={<MyAddresses />}
              ></Route>
              <Route
                path={PATHS.MYACCOUNT.WHISHLIST}
                element={<MyWhishlist />}
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
