import useMyContext from "../useMyContext";
import useFireStoreData from "../useFireStoreData";
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { updateProductCount, addProduct } = useMyContext();
  const { data: products } = useFireStoreData();

  const handleAddToCartClick = (product) => {
    updateProductCount(1);
    addProduct(product);
  };

  return (
    <div>
      <NavigationBar />
      <button
        style={{
          width: "100px",
          padding: "10px",
          margin: "20px",
          marginLeft: "60px",
          cursor: "pointer",
        }}
      >
        <Link to="/addProduct">Add Product</Link>
      </button>
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
            <div style={{ padding: "10px" }}>Price: {product.price} </div>
            <button
              style={{ padding: "10px", width: "150px", cursor: "pointer" }}
              onClick={() => handleAddToCartClick(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
