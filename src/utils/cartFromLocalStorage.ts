import { TCartItem, ICartState } from "../redux/slices/cart/types";

export const getCartFromLS = (): ICartState => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];

  const totalAmount = data
    ? items.reduce((sum: number, obj: TCartItem) => {
        return obj.amount + sum;
      }, 0)
    : 0;

  const totalPrice = data
    ? items.reduce((sum: number, obj: TCartItem) => {
        return obj.amount * obj.price + sum;
      }, 0)
    : 0;

  return { items, totalAmount, totalPrice };
};
