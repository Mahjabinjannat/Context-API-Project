import { useState } from "react";

import { CartContext } from "./CartContext";

function ContextProvider({ children }) {
  const [productCount, setProductCount] = useState(0);
  const updateProductCount = (count) => {
    setProductCount((prevstate) => prevstate + count);
  };

  const [cartProducts, setCartProducts] = useState([]);

  const addProduct = (product) => {
    setCartProducts(() => {
      let newArr = [];
      for (let i = 0; i < cartProducts.length; i += 1) {
        if (cartProducts[i].id === product.id) {
          const newProduct = {
            ...cartProducts[i],
            quantity: cartProducts[i].quantity + 1,
          };
          newArr.push(newProduct);
        } else {
          newArr.push(cartProducts[i]);
        }
      }

      const findProduct = newArr.find((item) => {
        return item.id === product.id;
      });

      if (!findProduct) {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        newArr.push(newProduct);
      }

      console.log(newArr);

      return newArr;
    });
  };

  const removeProduct = (product) => {
    let updatedProducts = [];
    for (let i = 0; i < cartProducts.length; i += 1) {
      if (cartProducts[i].id === product.id) {
        if (cartProducts[i].quantity > 1) {
          const newProduct = {
            ...product,
            quantity: cartProducts[i].quantity - 1,
          };
          updatedProducts.push(newProduct);
        }
      } else {
        updatedProducts.push(cartProducts[i]);
      }
    }

    setCartProducts(updatedProducts);
  };

  const handleTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i += 1) {
      totalPrice =
        totalPrice + cartProducts[i].price * cartProducts[i].quantity;
    }
    return totalPrice;
  };

  const resetCart = () => {
    setProductCount(0);
    setCartProducts([]);
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          cartProducts,
          addProduct,
          productCount,
          updateProductCount,
          removeProduct,
          handleTotalPrice,
          resetCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default ContextProvider;
