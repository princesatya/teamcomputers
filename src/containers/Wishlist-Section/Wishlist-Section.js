import React, { useEffect } from 'react';
import "../../assets/css/mycart.css"
import WishlistSectionCard from "../../components/common/Wishlist-Section-Card/Wishlist-Section-Card";
import { useDispatch, useSelector } from 'react-redux';
import { GETWISHLIST } from '../../assets/graphql';
import { savewishlist } from "../../features/HomePageSlice/homeDataSlice";
import { endpoint } from "../../api/endpoint";
import { apiHandler } from "../../api";
import { Token } from 'graphql';
import { getSampleCurrencyFormat } from "../../utils/utils";


const WishlistSection = () => {


    const { wishlist } = useSelector(
        (state) => state.home
    );
  

    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">Wishlist</li>
                    </ul>
                </div>
            </section>
            <section className="cart_wrap">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>Wishlist</h2>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        {wishlist && wishlist.items && wishlist.items.map((wishlistdata, index) =>
                            <div className="col-lg-4" key={index}>

                                <WishlistSectionCard
                                    ids={wishlistdata.id}
                                    sku={wishlistdata.product.sku}
                                    ProductName={wishlistdata.product.name}
                                    wishlist_img={wishlistdata.product.image.url ? wishlistdata.product.image.url : ""}
                                    final_price={getSampleCurrencyFormat(wishlistdata.product.price_range.minimum_price.final_price.currency, wishlistdata.product.price_range.minimum_price.final_price.value)}
                                //  Amount={wishlistdata.Amount?wishlistdata.Amount:""} 

                                //  Discount={wishlistdata.Discount?wishlistdata.Discount:""} 
                                />
                            </div>
                        )}
                  
                    </div>

                </div>

            </section>



        </>
    )
}
export default WishlistSection;