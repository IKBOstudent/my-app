export enum EStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EMPTY = "empty",
}

export type TPizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export interface IRequestState {
  items: TPizza[];
  status: EStatus;
}
