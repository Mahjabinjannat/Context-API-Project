import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowCartItem from "./components/ShowCartItem";
import ContextProvider from "./ContextProvider";
import Home from "./components/Home";
import OrderHistory from "./components/OrderHistory";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Routes>
            <Route exact path="/cart-item" element={<ShowCartItem />}></Route>
            <Route exact path="/my-orders" element={<OrderHistory />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/products" element={<Home />}></Route>
            <Route exact path="/add-product" element={<AddProduct />}></Route>
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
