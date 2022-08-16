import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PizzaInfo() {
  const [data, setData] = useState();
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

  console.log(data);
  if (!data) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <>
      <h2>{data.title}</h2>
      <img className="pizza-block__image" src={data.imageUrl} />

      <span className="pizza-block__price">от {data.price} ₽</span>
    </>
  );
}

export default PizzaInfo;
