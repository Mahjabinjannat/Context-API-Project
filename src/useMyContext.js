import { useContext } from "react";
import { CartContext } from "./CartContext";

const useMyContext = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export default useMyContext;
