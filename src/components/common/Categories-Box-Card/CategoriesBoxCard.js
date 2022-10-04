import React from "react";
import "../../../assets/css/custom.css";
import PhoneImage from '../../../assets/img/ipad-air.png';

const CategoriesBoxCard = ({ id, ProductName, ProductTitle, ProductImg }) => {
  return (
    <>
      {/* <!-- Categoreis Box Start --> */}


      <div className="categories-product-box-text-decoration-none">
        <div className="categoreisProduct">
          <h3>{ProductName}</h3>
          <span>{ProductTitle}</span>
          <a href={"/#/product-list/" + id}>Shop Now</a>
          <img src={ProductImg} alt="" className="img-fluid" />
        </div>
      </div>
      {/* <!-- Categoreis Box END --> */}

    </>
  )
}
export default CategoriesBoxCard;