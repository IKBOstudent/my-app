export type TCartItem = {
  imageUrl: string;
  title: string;
  type: number;
  size: number;
  price: number;
  amount: number;
};

export interface ICartState {
  items: TCartItem[];
  totalAmount: number;
  totalPrice: number;
}
