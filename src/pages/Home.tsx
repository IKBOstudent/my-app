import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PaginationBlock from "../components/PaginationBlock";

import {
  setCategoryId,
  setSort,
  setCurrentPage,
  setAllFilters,
} from "../redux/slices/filter/slice";

import { fetchItems } from "../redux/slices/request/asyncActoins";
import { RootState, UseAppDispatch } from "../redux/store";
import { TPizza } from "../redux/slices/request/types";

function Home() {
  const navigate = useNavigate();
  const dispatch = UseAppDispatch();

  const filtersSet = useRef(false);
  const didMount = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filterReducer
  );

  const { items, status } = useSelector(
    (state: RootState) => state.requestReducer
  );

  function pizzasRequest() {
    const url_page = "page=" + currentPage + "&limit=4";
    const url_category = categoryId !== 0 ? "&category=" + categoryId : "";
    const url_sort = "&sortBy=" + sort.sortProperty;
    const url_search = searchValue === "" ? "" : "&search=" + searchValue;

    dispatch(fetchItems({ url_page, url_category, url_sort, url_search }));
  }

  useEffect(() => {
    const str = window.location.search;
    if (str) {
      const params = qs.parse(str.substring(1)) as unknown as Record<
        string,
        string
      >;
      dispatch(setAllFilters(params));
      if (
        sort.sortProperty !== params.sortProperty ||
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
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  useEffect(() => {
    console.log("search string generator", didMount.current);

    if (didMount.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate("?" + queryString);
    }
    didMount.current = true;
  }, [categoryId, sort, currentPage]);

  const onClickCategory = useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  const onClickSort = useCallback((i: number) => {
    dispatch(setSort(i));
  }, []);

  if (status === "error") {
    return (
      <div className="content__error">
        <h2>Ошибка при загрузке :(</h2>
        <p>Сервер не доступен</p>
      </div>
    );
  }

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort sortId={sort.sortId} onClickSort={onClickSort} />
      </div>
      {status === "empty" ? (
        <div className="content__error">
          <h2>Ничего не найдено :(</h2>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>

          <div className="content__items">
            {status === "loading"
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj: TPizza) => (
                  <PizzaBlock key={obj.id} {...obj} />
                ))}
          </div>
          <div className="content__bottom">
            <PaginationBlock
              currentPage={currentPage}
              onChangePage={(page: number) => dispatch(setCurrentPage(page))}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
