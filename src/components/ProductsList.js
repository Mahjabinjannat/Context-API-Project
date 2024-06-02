import React, { useState } from "react";

import CartButton from "./CartButton";
import HomeButton from "./HomeButton";
import useMyContext from "../useMyContext";

const ProductsList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 400 },
    { id: 2, name: "Product 2", price: 500 },
    { id: 3, name: "Product 3", price: 600 },
    { id: 4, name: "Product 4", price: 700 },
  ]);
  // const { updateProductCount, addProduct } = useContext(CartContext);
  const { updateProductCount, addProduct } = useMyContext();

  const handleAddToCartClick = (product) => {
    updateProductCount(1);
    addProduct(product);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <HomeButton />
        <CartButton />
      </div>
      <div>
        {products.map((product, index) => (
          <div style={{ display: "flex", margin: "50px", padding: "10px" }}>
            <div
              key={index}
              style={{ width: "150px", padding: "10px" }}
              id="product"
            >
              {product.name}
            </div>
            <button
              style={{ padding: "10px", width: "150px", cursor: "pointer" }}
              onClick={() => handleAddToCartClick(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
