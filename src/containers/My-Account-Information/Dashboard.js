import React, { useState, useEffect } from 'react';
import "../../assets/css/dashboard.css";
import { CUSTOMERDATA } from '../../assets/graphql';
import { saveUserData } from '../../features/login/loginDataSlice';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';
import { useNavigate } from "react-router-dom";
import mydashboard from "../../assets/img/account/mydashboard.png";
import accountinformation from "../../assets/img/account/accountinformation.png";
import myorders from "../../assets/img/account/myorders.png";
import addressbook from "../../assets/img/account/addressbook.png";
import mywishlist from "../../assets/img/account/mywishlist.png";


const Dashboard = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(
        (state) => state.login
    );
    console.log(userData);
    const { token } = useSelector((state) => state.login);
    const navigate = useNavigate();
    useEffect(() => {
        getLoggedInUser();
    }, [])
    const getLoggedInUser = async () => {
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": {},
                "query": CUSTOMERDATA
            },
        });
        if (result.data && result.data.customer) {
            dispatch(saveUserData(result.data.customer));
        }
        else if (result.data.errors && result.data.errors[0] && result.data.errors[0].message && result.data.errors[0].message === "The cart isn't active.") {
            dispatch({ type: 'SIGNOUT' });
            navigate('/login');
        }
         else {
            toast.error(result.data.customer.message);
        }
    };

    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ul>
                </div>
            </section>
            <section className="cart_wrap checkoutpage">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>My Dashboard</h2>
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
                                        <li className="active"><a href="/#/dashboard"><img src={mydashboard} alt="" /> My Dashboard</a></li>
                                        <li><a href="/#/account-information"><img src={accountinformation} alt="" /> Account Information</a></li>
                                        <li><a href="/#/order-listing"><img src={myorders} alt="" /> My Orders</a></li>
                                        <li><a href="/#/address-book"><img src={addressbook} alt="" /> Address Book</a></li>
                                        <li><a href="/#/my-wish-list"><img src={mywishlist} alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="rightsidebar">
                                <div className="userinfo">
                                     <div  className=''>
                        {/* <div className="contactuserInfo">
                                    <a href="/#/account-information">Edit</a>
                                    </div> */}
                        </div>
                                    <strong>My Dashboard <br /> Hello, {userData.firstname && userData.firstname}{" "}{userData.lastname && userData.lastname} !</strong>
                                    {/* <p>From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</p> */}
                                </div>
                                
                                <div className="contactuserInfo">
                                    <strong>Contact Information</strong>
                                    <a href="/#/account-information">Edit</a>
                                  
                                        <ul className="contactuserInfo_list">
                                            <li>{userData.firstname && userData.firstname}{" "}{userData.lastname && userData.lastname}</li>
                                            <li><a href="javascript:void(0)">{userData.email && userData.email}</a></li>
                                            <li>{userData.mobile_number && userData.mobile_number}</li>
                                        </ul>
                               
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>

            </section>
        </>
    )
}

export default Dashboard; 