import React from 'react'
import { CartIcon } from '../icons'
import { useSelector } from 'react-redux';

const Navbar = () => {
  // hero icons from the makersof tailwindcss
  //useSelector hook accesses the store
  // when you see undefined in the console you are returning nothing
  const {amount} = useSelector( (store) => store.cart );
  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">
              {amount}
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar