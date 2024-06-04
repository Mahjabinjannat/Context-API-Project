import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from ".";

const useFireStoreData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "products");
        const querySnapshot = await getDocs(colRef);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFireStoreData;
