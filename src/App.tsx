import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Загрузка корзины...</div>,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>Загрузка...</div>,
});

const PizzaInfo = Loadable({
  loader: () => import(/* webpackChunkName: "PizzaInfo" */ "./pages/PizzaInfo"),
  loading: () => <div>Загрузка...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
