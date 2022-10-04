import React from "react";
import CategoriesBoxCard from "../../components/common/Categories-Box-Card/CategoriesBoxCard";
import promoiphone13pro from "../../assets/img/promo_iphone13pro.png"
import macpro from "../../assets/img/macbook-pro-13.png"
import ipadair from "../../assets/img/ipad-air.png"
import { useSelector } from 'react-redux';

const CategoriesBox = () => {
    const { categories, storeconfig } = useSelector(
        (state) => state.home

    );

    return (
        <>
            {/* <!-- Categoreis Box Start --> */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 mx-auto text-center pt-5 pb-5">
                            <div className="mainsection-title">
                                <h2>Categories</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row categoreis-grid-row-gap">
                        {categories && categories.map((category, index) =>
                            <>
                                {category.id != storeconfig.accessories_category_id && (
                                    <div className="col-md-6" key={index}>
                                        <div className={index === 2 || index === 3 || index === 6 || index === 7 ? 'black-bg' : "bg-gray-100"}>
                                            <CategoriesBoxCard id={category.url_key} ProductName={category.name} ProductTitle={category.url_path} ProductImg={category.image ? category.image : ""} />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>


                </div>
                {/* <!-- Categoreis Box END --> */}
            </section>
        </>
    )
}
export default CategoriesBox;