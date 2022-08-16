import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PaginationBlock from "../components/PaginationBlock";

import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setAllFilters,
} from "../redux/slices/filterSlice";

import { fetchItems } from "../redux/slices/requestSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filtersSet = useRef(false);

  const didMount = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filterReducer
  );

  const { items, status } = useSelector((state) => state.requestReducer);

  function pizzasRequest() {
    const url_page = "page=" + currentPage + "&limit=4";
    const url_category = categoryId !== 0 ? "&category=" + categoryId : "";
    const url_sort = "&sortBy=" + sortType.sortProperty;
    const url_search = searchValue === "" ? "" : "&search=" + searchValue;

    dispatch(fetchItems({ url_page, url_category, url_sort, url_search }));
  }

  useEffect(() => {
    const str = window.location.search;
    if (str) {
      const params = qs.parse(str.substring(1));
      dispatch(setAllFilters(params));
      if (
        sortType.sortProperty !== params.sortProperty ||
        categoryId !== Number(params.categoryId) ||
        currentPage !== Number(params.currentPage)
      ) {
        filtersSet.current = true;
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!filtersSet.current) {
      pizzasRequest();
    }

    filtersSet.current = false;
  }, [categoryId, sortType.sortProperty, currentPage, searchValue]);

  useEffect(() => {
    console.log("search string generator", didMount.current);

    if (didMount.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate("?" + queryString);
    }
    didMount.current = true;
  }, [categoryId, sortType, currentPage]);

  return (
    <>
      {status === "error" ? (
        <div className="content__error">
          <h2>Ошибка при загрузке :(</h2>
          <p>Сервер не доступен</p>
        </div>
      ) : (
        <>
          <div className="content__top">
            <Categories
              categoryId={categoryId}
              onClickCategory={(i) => dispatch(setCategoryId(i))}
            />
            <Sort
              sortType={sortType.sortId}
              onClickSort={(i) => dispatch(setSortType(i))}
            />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading"
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
          <div className="content__bottom">
            <PaginationBlock
              currentPage={currentPage}
              onChangePage={(page) => dispatch(setCurrentPage(page))}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
