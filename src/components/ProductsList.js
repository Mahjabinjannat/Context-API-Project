import useMyContext from "../useMyContext";
import useFireStoreData from "../useFireStoreData";
import NavigationBar from "./NavigationBar";

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
    </div>
  );
};

export default ProductsList;
