import { message } from "antd";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import { productService } from "../../services/productServices";
import { subcribeService } from "../../services/subscribeService";
import { useMemo, useState } from "react";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../contant/message";
import useDebounce from "../../hooks/useDebounce";

export const HOT_TABS = {
  featured: "featured",
  sale: "on-sale",
  top: "top-rated",
};

const useHome = () => {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery(productService.getProducts);
  const products = productsData?.products || [];

  const {
    data: homeData,
    loading: homeDataLoading,
    error: homeDataError,
  } = useQuery(() => pageService.getPageDataByName("home"));
  const brands = homeData?.data?.brands || [];
  const banners = homeData?.data?.banner || [];
  const heroCategory = homeData?.data?.category || [];
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  const { loading: dealLoading, excute: dealExcute } = useMutation(
    subcribeService.subscribeDeal,
    {
      onSuccess: (data) => {
        console.log("Data ", data);
        message.success(HOME_MESSAGE.dealSuccess);
      },
      onFail: (error) => {
        console.log("Error ", error);
        message.error(GENERAL_MESSAGE.dealErrors);
      },
    }
  );

  //Hot Product Section - xử lý data hot product sections
  const [selectedHotTab, setSelectedHotTab] = useState(HOT_TABS.featured);
  const hotProductProps = useMemo(() => {
    let hotProducts = [];
    switch (selectedHotTab) {
      case HOT_TABS.featured:
        hotProducts = products?.filter((product) => product.featured);
        break;
      case HOT_TABS.sale:
        hotProducts = products?.filter((product) => product.onSale);
        break;
      case HOT_TABS.top:
        hotProducts = products?.filter((product) => product.topRated);
        break;
      default:
        hotProducts = [];
        break;
    }
    return {
      hotProducts,
      selectedHotTab,
      onSelectHotTab: setSelectedHotTab,
    };
  }, [products, selectedHotTab]);

  //Brands Section
  const brandProps = {
    brands,
  };

  const introSectionProps = {
    banners,
    heroCategory,
  };

  //Featured Section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featuredProps = useMemo(() => {
    const featureProducts =
      selectedCateSlug === "all"
        ? [...(products || [])]
        : products?.filter(
            (product) => product?.category?.slug === selectedCateSlug
          );

    return {
      categories: [{ name: "All", slug: "all" }, ...categories],
      featureProducts,
      selectedCateSlug,
      onSelectCateSlug: (slug) => setSelectedCateSlug(slug),
    };
  }, [selectedCateSlug, products, categories, selectedCateSlug]);

  //Get Deal
  const onSubscribeDeal = (email) => {
    if (email) {
      dealExcute(email);
    }
  };
  const getDealProps = {
    onSubscribeDeal,
  };

  //Loading
  const isPageLoading = useDebounce(
    productsLoading || homeDataLoading || categoriesLoading || dealLoading,
    300
  );
  return {
    hotProductProps,
    featuredProps,
    getDealProps,
    isPageLoading,
    brandProps,
    introSectionProps,
  };
};

export default useHome;
