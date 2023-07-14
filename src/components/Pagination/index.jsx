import React, { useMemo } from "react";
import { styled } from "styled-components";

const PAGE_STEP = 2;
const Pagination = ({ page, limit = 0, total = 0, onPagiChange }) => {
  const totalPage = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [limit, total]);

  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;
    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }
    const list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }
    return list;
  }, [page, totalPage]);

  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onPagiChange(nextPage);
    }
  };
  const onPrev = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      onPagiChange(prevPage);
    }
  };
  const onFirst = () => {
    onPagiChange(1);
  };
  const onLast = () => {
    onPagiChange(totalPage);
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <PagiItem isDisabled={page === 1} onClick={onPrev}>
          <span aria-hidden="true">
            <i className="icon-long-arrow-left" />
          </span>
        </PagiItem>
        <PagiItem isDisabled={pageList[0] === 1} onClick={onFirst}>
          First
        </PagiItem>
        {pageList?.length > 0 &&
          pageList.map((pageNumb) => (
            <PagiItem
              key={pageNumb}
              isActive={pageNumb === page}
              onClick={() => {
                onPagiChange(pageNumb);
              }}
            >
              {pageNumb}
            </PagiItem>
          ))}
        <PagiItem className="page-item-total ">of {totalPage}</PagiItem>
        <PagiItem
          isDisabled={pageList[pageList.length - 1] === totalPage}
          onClick={onLast}
        >
          Last
        </PagiItem>
        <PagiItem
          isDisabled={pageList[pageList.length - 1] === page}
          onClick={onNext}
        >
          Next
          <span aria-hidden="true">
            <i className="icon-long-arrow-right" />
          </span>
        </PagiItem>
        {/* <li className="page-item disabled">
          <a
            className="page-link page-link-prev"
            href="#"
            aria-label="Previous"
            tabIndex={-1}
            aria-disabled="true"
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev{" "}
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item-total">of 6</li>
        <li className="page-item">
          <a className="page-link page-link-next" href="#" aria-label="Next">
            {" "}
            Next{" "}
            <span aria-hidden="true">
              <i className="icon-long-arrow-right" />
            </span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

//Pagination Item

const PagiItem = ({
  children,
  isActive = false,
  isDisabled = false,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <PagiItemWrapper
      className={`page-item ${className} ${isActive ? "active" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={() => (isDisabled ? {} : onClick())}
      {...props}
    >
      <a className="page-link" role="button">
        {children}
      </a>
    </PagiItemWrapper>
  );
};
const PagiItemWrapper = styled.li`
  margin: 0 10px;
  .page-link {
    &:hover {
      color: #fcb941 !important;
    }
    display: flex;
    gap: 10px;
  }
`;

export default Pagination;
