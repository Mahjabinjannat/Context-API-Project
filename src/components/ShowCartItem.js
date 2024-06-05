import useMyContext from "../useMyContext";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "..";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "./NavigationBar";

/*
order{
  productName
  productQuantity
  unit price
  total price
}[]

order{
  products: [

  ], 
  totalPrice, 
  totalQuantity
  address,
  contact info,
  user ino,
  
}


*/
const ShowCartItem = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const {
    cartProducts,
    addProduct,
    updateProductCount,
    removeProduct,
    handleTotalPrice,
    resetCart,
  } = useMyContext();

  const handleAddToCartClick = (product) => {
    updateProductCount(1);
    addProduct(product);
  };

  const handleRemoveFromCart = (product) => {
    updateProductCount(-1);
    removeProduct(product);
  };

  const addToDb = async () => {
    try {
      setIsSaving(true);
      const order = { products: [], totalPrice: 0, totalQuantity: 0 };
      let totalQuantity = 0;
      let totalPrice = 0;
      for (let i = 0; i < cartProducts.length; i += 1) {
        order.products.push(cartProducts[i]);
        totalQuantity = totalQuantity + cartProducts[i].quantity;
        totalPrice =
          totalPrice + cartProducts[i].quantity * cartProducts[i].price;
      }
      order.totalPrice = totalPrice;
      order.totalQuantity = totalQuantity;
      console.log(order);

      const newOrderRef = doc(collection(db, "orders"));
      await setDoc(newOrderRef, order);
      console.log("order created successfully!");
      resetCart();
      navigate("/my-orders");
    } catch (e) {
      console.log("failed ", e);
    }
    setIsSaving(false);
  };

  return (
    <div>
      <NavigationBar />
      {cartProducts.length === 0 && <h3>Add Products to Cart!</h3>}
      {cartProducts.length > 0 && (
        <table
          style={{
            textAlign: "center",
            width: "60%",
            margin: "40px",
          }}
        >
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th style={{ border: "1px solid black" }}>Product Name</th>
              <th style={{ border: "1px solid black" }}>Quantity</th>
              <th style={{ border: "1px solid black" }}>Unit Price</th>
              <th style={{ border: "1px solid black" }}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr style={{ border: "1px solid black" }}>
                <td
                  style={{
                    border: "1px solid black",
                  }}
                >
                  {product.name}
                </td>
                <td style={{ textAlign: "center", border: "1px solid black" }}>
                  <button
                    style={{
                      padding: "5px",
                      width: "50px",
                      margin: "10px",

                      backgroundColor: "grey",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddToCartClick(product)}
                  >
                    Inc
                  </button>
                  {product.quantity}

                  <button
                    style={{
                      padding: "5px",
                      width: "50px",
                      margin: "10px",

                      backgroundColor: "grey",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Dec
                  </button>
                </td>
                <td style={{ border: "1px solid black" }}>{product.price}</td>
                <td style={{ border: "1px solid black" }}>
                  {product.quantity * product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartProducts.length > 0 && (
        <div style={{ padding: "10px", margin: "15px", fontSize: "25px" }}>
          Total: {handleTotalPrice()}
        </div>
      )}

      {cartProducts.length > 0 && (
        <button
          style={{
            padding: "10px",
            width: "150px",
            cursor: "pointer",
            margin: "25px",
          }}
          disabled={isSaving}
          onClick={addToDb}
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default ShowCartItem;
