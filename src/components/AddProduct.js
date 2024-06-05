import { collection, doc, setDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import db from "..";
import NavigationBar from "./NavigationBar";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(0);

  const handleAddProduct = async () => {
    setIsSubmitting(true);

    const name = nameInputRef.current.value;
    const price = priceInputRef.current.value;
    const newProduct = {
      name: name,
      price: price,
    };

    const newProductRef = doc(collection(db, "products"));
    await setDoc(newProductRef, newProduct);
    setIsSubmitting(false);
    nameInputRef.current.value = null;
    priceInputRef.current.value = null;
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ margin: "20px" }}>
        <div style={{ display: "flex", margin: "20px", width: "500px" }}>
          <div style={{ margin: "10px", width: "150px" }}>
            Enter Product Name:
          </div>
          <input ref={nameInputRef} />
        </div>
        <div style={{ display: "flex", margin: "20px", width: "500px" }}>
          <div style={{ margin: "10px", width: "150px" }}>
            Enter Product Price:
          </div>
          <input ref={priceInputRef} />
        </div>
        <button
          style={{
            width: "100px",
            padding: "10px",
            margin: "30px",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleAddProduct}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
