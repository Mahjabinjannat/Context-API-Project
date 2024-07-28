import { collection, doc, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import db from "..";
import NavigationBar from "./NavigationBar";
import ImageUploading from "react-images-uploading";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
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

    const downloadLink = await uploadImage();
    console.log(downloadLink);
    const newProductRef = doc(collection(db, "products"));
    await setDoc(newProductRef, { ...newProduct, downloadLink });
    setIsSubmitting(false);
    nameInputRef.current.value = null;
    priceInputRef.current.value = null;
    setImages([]);
    console.log("finished!");
  };

  const uploadImage = async () => {
    const image = images[0];
    const imageFile = image.file;
    console.log("img", imageFile.name);
    const storage = getStorage();
    const storageRef = ref(storage, `product-images/${imageFile.name}`);

    await uploadString(storageRef, image.data_url, "data_url");
    const downloadLink = await getDownloadURL(storageRef);
    return downloadLink;
  };
  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div>
      <NavigationBar />
      <h3
        style={{
          margin: "20px",
          padding: "20px",
          width: "30%",
          textAlign: "center",
        }}
      >
        Product Registration
      </h3>
      <div style={{ margin: "20px" }}>
        <div style={{ display: "flex", margin: "20px", width: "500px" }}>
          <div style={{ margin: "10px", width: "150px" }}>
            Enter Product Name:
          </div>
          <input ref={nameInputRef} required />
        </div>
        <div style={{ display: "flex", margin: "20px", width: "500px" }}>
          <div style={{ margin: "10px", width: "150px" }}>
            Enter Product Price:
          </div>
          <input ref={priceInputRef} required />
        </div>
        <div
          style={{
            display: "flex",
            margin: "20px",
            width: "500px",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "10px", width: "150px" }}>Add Image:</div>
          <ImageUploading
            multiple={false}
            value={images}
            onChange={onChange}
            // maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <>
                <div>
                  <button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Upload
                  </button>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {imageList.map((image, index) => (
                    <div key={index}>
                      <img src={image.data_url} alt="" width="100" />
                      <div style={{ textAlign: "center" }}>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </ImageUploading>
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
