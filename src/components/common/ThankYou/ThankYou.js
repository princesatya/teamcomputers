import React from 'react'
import './Thankyou.css'
import { useNavigate } from 'react-router-dom';
function Thankyou() {
  const navigate = useNavigate();
  const orderListing = () => {
    navigate('/order-listing');
  }
  return (
    // <div className='my-5'>
    <section class="cart_wrap">
      {/* <!-- [Container] --> */}
      <div class="container">

        <div class="col-md-8 col-lg-6 mx-auto">
          <div class=" thankyoucontainer">
            <h1><i class="fas fa-smile"></i></h1>
            <h2><span>Thank You</span> For Buying From Us</h2>
            <p>For Order Details Please <button onClick={() => orderListing()}>Click Here</button></p>
          </div>
        </div>

      </div>
      {/* <!-- [/Container] --> */}
    </section>
    // </div>
  )
}

export default Thankyou
