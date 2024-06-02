import CartButton from "./CartButton";
import HomeButton from "./HomeButton";

import useMyContext from "../useMyContext";

const ShowCartItem = () => {
  const {
    cartProducts,
    addProduct,
    updateProductCount,
    removeProduct,
    handleTotalPrice,
  } = useMyContext();

  const handleAddToCartClick = (product) => {
    updateProductCount(1);
    addProduct(product);
  };

  const handleRemoveFromCart = (product) => {
    updateProductCount(-1);
    removeProduct(product);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <HomeButton />
        <CartButton />
      </div>
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
    </div>
  );
};

export default ShowCartItem;
