import React, { useState, useEffect } from 'react';
import "../../assets/css/order.css";
import { GET_ORDER_DETAILS } from '../../assets/graphql';
import { savegetorderdetail } from '../../features/HomePageSlice/homeDataSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import OrderList from '../../components/common/OrderList/OrderDetail';
import { useParams } from "react-router-dom";
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
    const { getorderdetail } = useSelector(
        (state) => state.home
    );
    console.log(getorderdetail);
    const { userData } = useSelector((state) => state.login);
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    const getCustomerorderdetail = async (id) => {
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": { id },
                    "query": GET_ORDER_DETAILS
                },
            });

            if (!result.data.error_code) {
                dispatch(savegetorderdetail(result.data.salesOrder));
            }
            else if (result.data.errors && result.data.errors[0] && result.data.errors[0].message && result.data.errors[0].message === "The cart isn't active.") {
                dispatch({ type: 'SIGNOUT' });
                navigate('/login');
            }
            console.log(result);
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        getCustomerorderdetail(id);
    }, [id])


    return (
        <>
            <section class="custombreadcrumb">
                <div class="container">
                    <ul class="breadcrumb justify-content-start">
                        <li class="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li class="breadcrumb-item active">Order Details</li>
                    </ul>
                </div>
            </section>


            <section class="cart_wrap checkoutpage">

                <div class="container">

                    <div class="row">
                        <div class="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div class="mainsection-title">
                                <h2>Order Details</h2>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <div class="leftsidebar">
                            <div className="profileBox">
                                    <div className="userprofileImg">{userData.firstname && userData.firstname[0]} {" "} {userData.lastname && userData.lastname[0]}</div>
                                    <h1>{userData.firstname && userData.firstname} {" "}{userData.lastname && userData.lastname}</h1>
                                </div>
                                <div class="dashboardmenu">
                                    <ul>
                                        <li><a href="/#/dashboard"><img src="img/mydashboard.png" alt="" /> My Dashboard</a></li>
                                        <li><a href="/#/account-information"><img src="img/accountinformation.png" alt="" /> Account Information</a></li>
                                        <li class="active"><a href="/#/order-listing"><img src="img/myorders.png" alt="" /> My Orders</a></li>
                                        <li><a href="/#/address-book"><img src="img/addressbook.png" alt="" /> Address Book</a></li>
                                        <li><a href="/#/my-wish-list"><img src="img/mywishlist.png" alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-9">
                            <div class="rightsidebar">
                                <div class="delivery_full_info">

                                    <div class="billing">
                                        <h3>Billing Address</h3>
                                        {getorderdetail && getorderdetail.billing && getorderdetail.billing.map((order, index) =>
                                            <>
                                                <strong>{order.name}</strong>
                                                <p>
                                                    {order.street}, {order.region}, {order.city}-{order.postcode}
                                                </p>
                                                <p><strong>Phone No.: </strong>{order.telephone}</p>
                                            </>
                                        )}
                                    </div>

                                    <div class="shipping">
                                        <h3>Shipping Address</h3>
                                        {getorderdetail && getorderdetail.shipping && getorderdetail.shipping.map((order, index) =>
                                            <>
                                                <strong>{order.name}</strong>
                                                <p>
                                                    {order.street}, {order.region}, {order.city}-{order.postcode}
                                                </p>
                                                <p><strong>Phone No.: </strong>{order.telephone}</p>
                                            </>
                                        )}
                                    </div>
                                    <div class="track_order_box">
                                        <a className="btn custombutton" href={getorderdetail && getorderdetail.custom_invoice} target="_blank"><i className="fas fa-eye"></i>Invoice</a>
                                    </div>

                                    {/* <div class="track_order_box">
                                        <a href="#" class="btn default_button">Track Order</a>
                                    </div> */}
                                </div>

                                <div class="order_grid order_details">
                                    {getorderdetail && getorderdetail.items && getorderdetail.items.map((orderitem, index) =>
                                        <>
                                            <OrderList
                                                Orderid={ getorderdetail.increment_id }
                                                productImg={orderitem.image}
                                                ProductName={orderitem.title}
                                                FinalPrice={orderitem.price }
                                                quantity={orderitem.qty}
                                                // invoices={getorderdetail.custom_invoice}
                                                // OldPrice={orderitem.price}
                                                deliveryDate={ getorderdetail.created_at}
                                                status={getorderdetail.status}
                                            />
                                        </>
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

export default MyOrder; 