import React, { useState } from 'react';
import "../../assets/css/login.css";
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { GENERATEOTP, VALIDATEOTP, CUSTOMERDATA, CUSTOMER_CART, GET_CUSTOMER_CART, BANNERS } from '../../assets/graphql';
import { useNavigate } from "react-router-dom";
import { saveToken, saveUserData } from "../../features/login/loginDataSlice";
import {savecustomerresult, saveaddtoproductcart, saveBanner} from '../../features/HomePageSlice/homeDataSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const isValidName = (email) => {
    //     var emailCheck = /[!#$%^&*()_+,\-=[\]{};':"\\|<>/?]+/;
    //     if (email.trim() == '') {
    //         return { message: 'This is a required field.' };
    //     }
    //     if (emailCheck.test(email.trim())) {
    //         return {
    //             message:
    //                 'Email should not contain special characters other than . and @.',
    //         };
    //     }
    //     return null;
    // };

    const LoginFn = async () => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { email: userEmail },
                "query": GENERATEOTP
            },
        });
        setLoader(false);

        if (result.data && result.data.generateOtp && result.data.generateOtp.status && result.data.generateOtp.status == 1) {
            setShowLogin(true);
            toast.success(result.data.generateOtp.message);

        } else {
            // alert(result.data.generateOtp.message);
            // toast(result.data.generateOtp.message);
            toast.error("Please Enter email  id");
        }
    };
    const RequestOtp = async () => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { email: userEmail, otp: otpCode },
                "query": VALIDATEOTP
            },
        });
        setLoader(false);
        if (result.data && result.data.validateOtp && result.data.validateOtp.status && result.data.validateOtp.status == 1) {
            dispatch(saveToken(result.data.validateOtp.token));
            getLoggedInUser(result.data.validateOtp.token);
            getCustomerCartDetails(result.data.validateOtp.token);
            getBannersList(result.data.validateOtp.token);
            toast.error(result.data.generateOtp.message);
        } else {
            toast.error(result.data.validateOtp.message);
        }
    };
    const getLoggedInUser = async (token) => {
        setLoader(true);
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
        setLoader(false);
        navigate('/home');
        if (result.data && result.data.customer) {
            setShowLogin(false);
            dispatch(saveUserData(result.data.customer));
        } else {
            toast.error(result.data.customer.message)            
        }
    };
    const getCustomerCartDetails = async (token) => {
        if (token) {
            const customerresult = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: CUSTOMER_CART,
                    variables: {},
                },
            });

            if (!customerresult.data.error_code) {
                dispatch(savecustomerresult(customerresult.data.customerCart));
                getLatestCartInfo(token, customerresult.data.customerCart.id);
            }
        }
    };
    const getLatestCartInfo = async (token, cartId) => {
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: GET_CUSTOMER_CART,
                    variables: {cart_id: cartId},
                },
            });
            if (!result.data.message) {
            
                dispatch(
                    saveaddtoproductcart(result.data.cart)
                );
            }
            else {
                toast.error(result.data.message);
            }
        }
    };
    const getBannersList = async (token) => {
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: BANNERS,
                    variables: {},
                },
            });
            if (!result.data.message) {
            
                dispatch(
                    dispatch(saveBanner(result.data.sliderdata))
                );
            }
            else {
                toast.error(result.data.message);
            }
        }
    };
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            LoginFn();
        }
      };
      const resendhandleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            RequestOtp();
        }
      }; 
    return (
        <>
            {/* <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">My Cart</li>
                    </ul>
                </div>
            </section> */}
            <section className="login_wrap">
                <div className="container">
                    <div className="loginform_wrap">
                        <div className="row">
                            <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                                <div className="mainsection-title">
                                    <h2>Login / Signup</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 mx-auto ">
                            <div className="row">
                                <div className="col-lg-6 p-0">
                                    <div className="login_options">
                                        <h3>Login or Create an account</h3>
                                        <p>
                                            By creating an account with our store, you will be able to:
                                        </p>
                                        <ul>
                                            <li>- Move through the checkout process faster.</li>
                                            <li>- Store multiple shipping addresses.</li>
                                            <li>- View and track your orders in your account and more.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 p-0">
                                    <div className="log_sign_form">
                                        <p>If you have an account with us, please log in.</p>
                                        <div >
                                            {showLogin ? (<>
                                                <div className="otp_box" >
                                                    <div className="form_row">
                                                        <label for="">Enter OTP:</label>
                                                        <input type="text" name="otp" id="otp" value={otpCode} onChange={(e) => setOtpCode(e.target.value)}   onKeyDown={(e) => resendhandleKeypress(e)} placeholder="" />
                                                    </div>
                                                    <div className="form_row">
                                                        <button className="btn default_button" onClick={()=>RequestOtp()}>Login</button>&nbsp;&nbsp;
                                                        <a onClick={()=>LoginFn()}>Resend OTP</a>
                                                    </div>
                                                </div>
                                            </>) : (<>
                                                <div className="mobile_box">
                                                    <div className="form_row">
                                                        <label for="">Enter Your Email:</label>
                                                        <input type="text" name="mobile" id="mobile" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}  onKeyDown={(e) => handleKeypress(e)} placeholder="Enter your email" autoFocus />
                                                    </div>
                                                    <div className="form_row">
                                                        <button type="submit" className="btn default_button" onClick={LoginFn} >Request OTP</button>
                                                    </div>
                                                </div>
                                            </>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
            {loader && (
                <div className='loading-overlay'>
                    <div className='bounce-loader'>
                        {/* <div className='bounce1'></div>
								<div className='bounce2'></div>
								<div className='bounce3'></div> */}
                        <div className="loader"></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login