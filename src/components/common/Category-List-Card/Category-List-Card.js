import React from "react";
import {Link} from "react-router-dom";

const CategoryListCard = ({ url_key, url_path, PrductImg, ProductDetail, ProductName }) => {
  
    return (
        <>
            <div className="accessoriesproductbox leftsideproductlisting">
                <div className="productDetails">
                    <strong> <b> {ProductDetail} </b>   </strong>
                    <h5 style={{ color: "#00ABC5" }}>{ProductName}</h5>

                </div>
                <div className="productImg">
                    <img src={PrductImg} className="img-fluid" />
                </div>
                <div className="productDetails" style={{ textAlign: "center" }}>
                    <Link className="btn custombutton" to={"/product-list/" + url_key} state={{url_path: "" + url_path}}>
                        {"Know More"}
                    </Link>
                </div>
            </div>
        </>
    )
}
export default CategoryListCard;