import React from "react";
import { FaShoppingCart, FaEye } from 'react-icons/fa';


const AccessoriesSectionCard = ({ id, PrductImg, ProductDetail, ProductPrice }) => {

    return (
        <>
            <div className="accessoriesproductbox">
                <div className="productImg">
                    <img src={PrductImg} className="img-fluid" style={{ height: "200px", margin: "0px auto", display: "block" }} />
                    <span className="newtag">NEW</span>
                </div>
                <div className="productDetails">
                    <h5>{ProductDetail}</h5>
                    <strong>Offer Price : <b> {ProductPrice}/- </b> (Incl. of all taxes)  </strong>
                    {/* <a className="btn custombutton" href="/#/my-cart"><i className="fas fa-shopping-cart"><FaShoppingCart /></i> Buy Now</a> */}
                    {/* <a className="btn custombutton" href={"/#/product-detail/" + id}><i className="fas fa-eye"><FaEye /></i> Know More</a> */}

                    {/* <a className="btn custombutton" href="/#/my-cart"><i className="fas fa-shopping-cart"><FaShoppingCart /></i> Buy Now</a> */}
                    <div >
                        <a className="btn custombutton" href={"/#/product-detail/" + id}><i className="fas fa-eye"><FaEye /></i> Know More</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccessoriesSectionCard;