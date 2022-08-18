import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import PizzaInfo from "./pages/PizzaInfo";

import "./scss/app.scss";

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
