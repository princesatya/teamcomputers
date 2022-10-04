import React, { useState, useEffect } from 'react';
import "../../assets/css/order.css";
import { CUSTOMER_ORDER_LIST } from '../../assets/graphql';
import { savecustomerorderlist } from '../../features/HomePageSlice/homeDataSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import ExtendOrderList from '../../components/common/OrderList/ExtendOrderList';
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';
import { useNavigate } from "react-router-dom";
import { getSampleCurrencyFormat } from '../../utils/utils';
import mydashboard from "../../assets/img/account/mydashboard.png";
import accountinformation from "../../assets/img/account/accountinformation.png";
import myorders from "../../assets/img/account/myorders.png";
import addressbook from "../../assets/img/account/addressbook.png";
import mywishlist from "../../assets/img/account/mywishlist.png";

const OrderListing = () => {
    const { getcustomerorderlist } = useSelector(
        (state) => state.home
    );
    console.log(getcustomerorderlist);
    // const data = getcustomerorderlist.sort().reverse()
    // console.log(data)
    const { userData } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.login);
    const GetCustomerOrderList = async () => {

        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": CUSTOMER_ORDER_LIST
                },
            });
            console.log(result);
            if (result.data.customerOrders) {
                let data = result.data.customerOrders.items.sort((a, b) => (a.id > b.id ? -1 : 1));
                console.log(data)
                dispatch(savecustomerorderlist(data));
            }
            else if (result.data.errors && result.data.errors[0] && result.data.errors[0].message && result.data.errors[0].message === "The cart isn't active.") {
                dispatch({ type: 'SIGNOUT' });
                navigate('/login');
            }

        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        GetCustomerOrderList();
    }, [])

    return (
        <>
            <section class="custombreadcrumb">
                <div class="container">
                    <ul class="breadcrumb justify-content-start">
                        <li class="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li class="breadcrumb-item active">My Orders</li>
                    </ul>
                </div>
            </section>
            <section class="cart_wrap checkoutpage">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div class="mainsection-title">
                                <h2>My Orders</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <div class="leftsidebar">
                                <div className="profileBox">
                                    <div className="userprofileImg">{userData.firstname && userData.firstname[0]}{" "}{userData.lastname && userData.lastname[0]}</div>
                                    <h1>{userData.firstname && userData.firstname}{" "}{userData.lastname && userData.lastname}</h1>
                                </div>
                                <div class="dashboardmenu">
                                    <ul>
                                        <li><a href="/#/dashboard"><img src={mydashboard} alt="" /> My Dashboard</a></li>
                                        <li><a href="/#/account-information"><img src={accountinformation} alt="" /> Account Information</a></li>
                                        <li class="active"><a href="/#/order-listing"><img src={myorders} alt="" /> My Orders</a></li>
                                        <li><a href="/#/address-book"><img src={addressbook} alt="" /> Address Book</a></li>
                                        <li><a href="/#/my-wish-list"><img src={mywishlist} alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-9">
                            <div class="rightsidebar">

                                <div class="order_grid">
                                    {getcustomerorderlist && getcustomerorderlist.map((list, index) =>
                                        <ExtendOrderList
                                            status={list.status}
                                            id={list.id}
                                            Orderid={list.order_number}
                                            ProductName={list.title}
                                            FinalPrice={getSampleCurrencyFormat("INR", list.grand_total)}
                                            OldPrice={list.price}
                                            deliveryDate={list.order_date}
                                        />
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

export default OrderListing; 