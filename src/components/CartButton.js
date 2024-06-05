import { Link } from "react-router-dom";

import useMyContext from "../useMyContext";

const CartButton = () => {
  const { productCount } = useMyContext();

  const handleCartClick = () => {};
  return (
    <div onClick={handleCartClick}>
      <Link to="/cart-item">Cart({productCount})</Link>
    </div>
  );
};

export default CartButton;
