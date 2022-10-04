import React, { useEffect } from "react";
// import "../../assets/css/product-list.css";
import { FaShoppingCart } from 'react-icons/fa';

const ProductListCard = ({ id, ProductImg, ProductPrice, ProductName }) => {
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return (
        <>

            <div className="boxp text-center accessoriesproductbox" >
                <a href={"/#/product-detail/" + id}>
                    <div className="productnamesk">{ProductName} </div>
                    <div className="productImg"><img src={ProductImg} class="img-fluid" /></div>

                    <div className="textdes productDetails" onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}

                    >

                        {/* <p><small>Offer Price : </small><span> {ProductPrice}/-</span></p> */}
                        <a href={"/#/product-detail/" + id} className="btn custombutton" >
                            {/* <button className="pbtn"> */}
                            <i className="fas fa-shopping-cart">
                                {/* <FaShoppingCart/> */}
                            </i> Shop Now
                            {/* </button> */}
                        </a>
                    </div>
                </a>

            </div>

        </>
    )
}
export default ProductListCard;