import React from "react";
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import "../../../assets/css/custom.css";

const NewLaunchesCard = ({ id, ProductImg, ProductName, ProductPrice, ProductTitle }) => {
    return (
        <>
            {/* <!-- New Launches -->     */}
            {/* <!-- product--> */}
            <div className="item">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                        <div className="bg-gray-300">
                            <img src={ProductImg} className="img-fluid p-5" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="productdetail">
                            <h2>{ProductName}</h2>
                            <strong>Offer Price :  {ProductPrice}</strong>
                            {/* <!-- <span><i>Old Price ₹1299</i>  (Incl. of all taxes)</span> --> */}
                            <p dangerouslySetInnerHTML={{ __html: ProductTitle }}></p>
                            <a className="btn custombutton" href={"/#/product-detail/" + id}><i className="fas fa-eye"><FaEye /></i> Know More</a>
                            {/* <a className="btn custombutton" href={"/#/product-detail/" + id}><i className="fas fa-shopping-cart"><FaShoppingCart /></i> Buy Now</a> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /product--> */}

            {/* <!-- New Launches END --> */}


        </>
    )
}
export default NewLaunchesCard;