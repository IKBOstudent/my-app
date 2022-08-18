import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PizzaInfo() {
  const [data, setData] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      const url =
        "https://62b317614f851f87f453f621.mockapi.io/items/" + params.id;
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        alert("bad");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!data) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <>
      <h2>{data.title}</h2>
      <img className="pizza-block__image" src={data.imageUrl} />
      <span className="pizza-block__price">от {data.price} ₽</span>

      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
}

export default PizzaInfo;
