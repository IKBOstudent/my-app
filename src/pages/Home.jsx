import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PaginationBlock from '../components/PaginationBlock';

import {
    setCategoryId,
    setSortType,
    setCurrentPage,
    setAllFilters,
} from '../redux/slices/filterSlice';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearchFiltered = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sortType, currentPage } = useSelector((state) => state.filterReducer);

    const { searchValue } = React.useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log('search string generator', isMounted.current);
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage,
            });
            navigate('?' + queryString);
        }
        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, currentPage]);

    useEffect(() => {
        // console.log('search dispatch');
        const str = window.location.search;
        if (str) {
            const params = qs.parse(str.substring(1));
            dispatch(setAllFilters(params));
            isSearchFiltered.current = true;
        }
    }, []);

    useEffect(() => {
        // console.log('fetching, search filtered:', isSearchFiltered.current);
        window.scrollTo(0, 0);
        if (!isSearchFiltered.current) {
            setIsLoading(true);

            var url = 'https://62b317614f851f87f453f621.mockapi.io/items?';
            url += 'page=' + currentPage + '&limit=4';
            url += categoryId !== 0 ? '&category=' + categoryId : '';
            url += '&sortBy=' + sortType.sortProperty;
            url += searchValue === '' ? '' : '&search=' + searchValue;

            axios.get(url).then((response) => {
                setItems(response.data);
                setIsLoading(false);
            });
        }

        isSearchFiltered.current = false;
    }, [categoryId, sortType.sortProperty, currentPage, searchValue]);

    // console.log(categoryId, sortType, currentPage, searchValue);

    return (
        <>
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(i) => dispatch(setCategoryId(i))}
                />
                <Sort sortType={sortType.sortId} onClickSort={(i) => dispatch(setSortType(i))} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
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
    );
}

export default Home;
