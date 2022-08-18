import { memo } from "react";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

const Categories = memo(({ categoryId, onClickCategory }: CategoriesProps) => {
  const category_types = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {category_types.map((value, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                onClickCategory(i);
              }}
              className={categoryId === i ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
