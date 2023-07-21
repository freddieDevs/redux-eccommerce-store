import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
//useSelector acceses the store, you dont need to make any imports on the items
//useDispatch accesses the features or actions sfor that matter
function App() {
  const {cartItems, isLoading} = useSelector( (store) => store.cart )
  const {isOpen} = useSelector( (store) => store.modal )
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(calculateTotals());
  },[cartItems])

  useEffect( () => {
    dispatch(getCartItems('random'));
  }, []);

  if(isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
