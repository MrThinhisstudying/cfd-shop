import React from "react";
import IntroSection from "./IntroSection";
import HotProductSection from "./HotProductSection";
import DealSection from "./DealSection";
import BrandSection from "./BrandSection";
import FeaturedSection from "./FeaturedSection";
import ServiceSection from "./ServiceSection";
import GetDealSection from "./GetDealSection";
import useHome from "./useHome";
import PageLoading from "../../components/LoadingPage";

const HomePage = () => {
  const {
    hotProductProps,
    featuredProps,
    isPageLoading,
    brandProps,
    getDealProps,
    introSectionProps,
  } = useHome();

  if (isPageLoading) return <PageLoading />;
  return (
    <main className="main">
      <IntroSection {...introSectionProps} />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection />
      <BrandSection {...brandProps} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection />
      <GetDealSection {...getDealProps} />
    </main>
  );
};

export default HomePage;
