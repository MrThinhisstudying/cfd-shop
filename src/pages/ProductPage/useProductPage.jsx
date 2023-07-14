import React, { useEffect, useMemo } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { productService } from "../../services/productServices";
import useQuery from "../../hooks/useQuery";
import { SORT_OPTIONS } from "../../contant/sortProduct";
const PRODUCT_LIMITS = 9;
const useProductPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  //Call API
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProduct,
  } = useQuery((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};
  const productListProps = {
    products,
    isLoading: productsLoading,
    isError: productsError,
  };

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  //useEffect
  //refetch when search change
  useEffect(() => {
    refetchProduct?.(search);
  }, [search]);

  //Get query string
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  //Pagination change
  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

  // Selected prop (ToolBox props)
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);
  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };
  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi.total || 0,
    activeSort,
    onSortChange,
  };

  //Checked category
  const onCateFilterChange = (cateId) => {
    updateQueryString({ ...queryObject, category: cateId, page: 1 });
  };

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: queryObject.category,
    onCateFilterChange,
  };

  return {
    pagiProps,
    productListProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
