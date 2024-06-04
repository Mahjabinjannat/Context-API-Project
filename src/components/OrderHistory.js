import useFetchOrders from "../useFetchOrders";
import NavigationBar from "./NavigationBar";

const OrderHistory = () => {
  const { data: orderList } = useFetchOrders();
  return (
    <div>
      <NavigationBar />
      {orderList.map((order, index) => {
        const products = order.products;
        return (
          <div>
            <h3>
              Order No: {index + 1} - Order ID: {order.id}
            </h3>
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
              {products.map((product) => (
                <tbody>
                  <tr style={{ border: "1px solid black" }}>
                    <td
                      style={{
                        border: "1px solid black",
                      }}
                    >
                      {product.name}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                      }}
                    >
                      {product.quantity}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                      }}
                    >
                      {product.price}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                      }}
                    >
                      {product.quantity * product.price}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div style={{ display: "flex", margin: "10px" }}>
              <h4 style={{ padding: "10px" }}>
                Total Quantity: {order.totalQuantity}
              </h4>
              <h4 style={{ padding: "10px" }}>
                Total Price: {order.totalPrice}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
