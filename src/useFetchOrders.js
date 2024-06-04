import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from ".";

const useFetchOrders = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "orders");
        const querySnapshot = await getDocs(colRef);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
        console.log(documents);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, []);
  return { data, error };
};

export default useFetchOrders;
