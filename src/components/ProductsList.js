import useMyContext from "../useMyContext";
import useFireStoreData from "../useFireStoreData";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const navigate = useNavigate();
  const { updateProductCount, addProduct } = useMyContext();
  const { data: products } = useFireStoreData();

  const handleAddToCartClick = (product) => {
    updateProductCount(1);
    addProduct(product);
  };
  console.log("Test");
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
        onClick={() => navigate("/add-product")}
      >
        Add Product
      </button>
      <div>
        {products.map((product, index) => (
          <div style={{ display: "flex", margin: "50px", padding: "10px" }}>
            <div key={index} style={{ width: "150px", padding: "10px" }}>
              {product.name}
            </div>
            <div style={{ padding: "10px" }}>Price: {product.price} </div>
            <div
              key={index}
              style={{ width: "150px", height: "150px", padding: "10px" }}
            >
              <img
                src={product.downloadLink}
                alt=""
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
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
    </div>
  );
};

export default ProductsList;
