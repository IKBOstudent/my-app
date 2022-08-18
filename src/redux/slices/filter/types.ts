export const sortNames = ["rating", "price", "title"];

type TSort = {
  sortId: number;
  sortProperty: string;
};

export interface IFilterState {
  categoryId: number;
  sort: TSort;
  currentPage: number;
  searchValue: string;
}
