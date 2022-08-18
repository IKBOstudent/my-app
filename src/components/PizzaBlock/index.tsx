import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/cart/slice";
import { RootState } from "../../redux/store";
import { TCartItem } from "../../redux/slices/cart/types";

type pizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export const PizzaBlock = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}: pizzaBlockProps) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cartReducer);

  function countItemAmount() {
    const good_items = items.filter((obj: TCartItem) => obj.title === title);
    let counter = 0;
    good_items.map((obj: TCartItem) => (counter += obj.amount));
    return counter;
  }

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => {
                  setActiveType(type);
                  console.log(type);
                }}
                className={type === activeType ? "active" : ""}
              >
                {type === 0 ? "тонкое" : "традиционное"}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => {
                  setActiveSize(i);
                }}
                className={i === activeSize ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div
            onClick={() => {
              dispatch(
                addItem({
                  imageUrl,
                  title,
                  type: activeType,
                  size: sizes[activeSize],
                  price,
                  amount: 0,
                })
              );
            }}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{countItemAmount()}</i>
          </div>
        </div>
      </div>
    </div>
  );
};
