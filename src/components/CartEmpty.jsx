import React from "react";
import { Link } from "react-router-dom";

import emptyCartImg from "../assets/img/empty-cart.png";

function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая :(</h2>
      <p>
        Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар.
        <br />
        Мы доставим ваш заказ от 549 ₽
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться в меню</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
