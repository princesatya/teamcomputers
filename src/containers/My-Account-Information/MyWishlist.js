import React, { useState, useEffect } from 'react';
import "../../assets/css/dashboard.css";
import { useSelector } from 'react-redux';
import { savecustomerresult, saveaddtoproductcart, } from '../../features/HomePageSlice/homeDataSlice';
import { endpoint } from '../../api/endpoint';
import { apiHandler } from '../../api';
import { ADD_TO_PRODUCT_CART, CUSTOMER_CART, REMOVE_PRODUCT_FROM_WISHLIST } from '../../assets/graphql';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSampleCurrencyFormat } from "../../utils/utils";
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import MyWishlistCard from '../../components/common/My-WishList-Card/MyWishListCard';
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';

const MyWishlist = () => {
    const { userData } = useSelector(
        (state) => state.login
    );
  
    const { wishlist } = useSelector((state) => state.home);
  

    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">My Wishlist</li>
                    </ul>
                </div>
            </section>


            <section className="cart_wrap checkoutpage">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>My Wishlist</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <div className="leftsidebar">
                                <div className="profileBox">
                                    <div className="userprofileImg">{userData.firstname && userData.firstname[0]}{" "}{userData.lastname && userData.lastname[0]}</div>
                                    <h1>{userData.firstname && userData.firstname}{" "}{userData.lastname && userData.lastname}</h1>
                                </div>
                                <div className="dashboardmenu">
                                    <ul>
                                        <li><a href="/#/dashboard"><img src="img/mydashboard.png" alt="" /> My Dashboard</a></li>
                                        <li><a href="/#/account-information"><img src="img/accountinformation.png" alt="" />Account Information</a></li>
                                        <li><a href="/#/order-listing"><img src="img/myorders.png" alt="" /> My Orders</a></li>
                                        <li><a href="/#/address-book"><img src="img/addressbook.png" alt="" /> Address Book</a></li>
                                        <li className="active"><a href="/#/my-wish-list"><img src="img/mywishlist.png" alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-9">
                            <div className="rightsidebar">
                                <div className="row">
                                    {wishlist && wishlist.items && wishlist.items.map((wishlistdata, index) =>
                                        <MyWishlistCard ids={wishlistdata.id} sku={wishlistdata.product.sku} ProductImg={wishlistdata.product.image.url} ProductPrice={getSampleCurrencyFormat(wishlistdata.product.price_range.minimum_price.final_price.currency, wishlistdata.product.price_range.minimum_price.final_price.value)} />

                                    )}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}

export default MyWishlist; 