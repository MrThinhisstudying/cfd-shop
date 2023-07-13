import React, { useEffect, useState } from "react";
import { HOT_TABS } from "./useHome";
import OwlCarousel from "react-owl-carousel";
import ProductCard from "../../components/ProductCard";

const HotProductSection = ({ hotProducts, selectedHotTab, onSelectHotTab }) => {
  const [renderedProducts, setRenderedProducts] = useState([]);

  useEffect(() => {
    setRenderedProducts(hotProducts);
  }, [hotProducts]);

  const onTabChange = (tab) => {
    setRenderedProducts([]);
    console.log("Click");
    setTimeout(() => {
      onSelectHotTab?.(tab);
    }, 300);
  };

  return (
    <div className="container featured" style={{ minHeight: 550 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.featured ? "active" : ""
            }`}
            onClick={() => onTabChange(HOT_TABS.featured)}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.sale ? "active" : ""
            }`}
            onClick={() => onTabChange(HOT_TABS.sale)}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedHotTab === HOT_TABS.top ? "active" : ""
            }`}
            onClick={() => onTabChange(HOT_TABS.top)}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={`tab-pane p-0 fade ${
            renderedProducts?.length > 0 ? "show active" : " "
          }`}
          role="tabpanel"
          style={{ minHeight: 423 }}
        >
          {renderedProducts?.length > 0 && (
            <OwlCarousel
              className="owl-full carousel-equal-height carousel-with-shadow"
              nav
              margin={20}
              responsive={{
                0: {
                  items: 2,
                },
                600: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {renderedProducts?.map((product, index) => {
                return (
                  <ProductCard key={product?.id || index} product={product} />
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProductSection;
