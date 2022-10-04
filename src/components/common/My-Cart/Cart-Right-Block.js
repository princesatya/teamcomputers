import React, { useState } from 'react';
import "../../../assets/css/wishlist.css";
import { FaGift } from 'react-icons/fa';
// import "../../../assets/css/style.css";
import { useSelector, useDispatch } from 'react-redux';
import { getSampleCurrencyFormat } from "../../../utils/utils";
import { GET_CUSTOMER_CART, APPLY_COUPONS, REMOVE_COUPONS_CART } from '../../../assets/graphql';
import { saveaddtoproductcart } from '../../../features/HomePageSlice/homeDataSlice';
import { apiHandler } from "../../../api";
import { endpoint } from "../../../api/endpoint";
import { useNavigate } from "react-router-dom";

const CartRightBlock = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [couponCode, setCouponCode] = useState("");
    const [applyCouponCart, setApplyCoupanCart] = useState({})
    const [loader, setLoader] = useState(false);
    const { addtoproductcart, customerresult, appliedCoupon, cartPrices,shippingAddresses } = useSelector(
        (state) => state.home
    );

    console.log(shippingAddresses);
    const { token } = useSelector((state) => state.login);

    const getLatestCartInfo = async () => {
        if (token) {
            setLoader(true);
            console.log(result);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: GET_CUSTOMER_CART,
                    variables: { cart_id: customerresult.id },
                },
            });
            setLoader(false);
            if (!result.data.message) {

                dispatch(
                    saveaddtoproductcart(result.data.cart)
                );
                console.log(result.data.cart);

            }
            else {
            }
        } else {
            navigate('/login');
        }
    };
    const ApplyCoupons = async () => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        coupon_code: couponCode,
                        cart_id: customerresult.id
                    },
                    "query": APPLY_COUPONS
                },
            });
            setLoader(false);
            setApplyCoupanCart(result.data.applyCouponToCart.cart);
            console.log(result.data.applyCouponToCart.cart);
            getLatestCartInfo();
        }

        else {
            navigate('/login');
        }
    };

    const removeCouponFromCart = async () => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        cart_id: customerresult.id
                    },
                    "query": REMOVE_COUPONS_CART
                },
            });
            setLoader(false);
            getLatestCartInfo();
        }
        else {
            navigate('/login');
        }
    };


    const getTotalAmount = () => {
        let totalPrice = 0;
        addtoproductcart && addtoproductcart.forEach(element => {
            const value = element.prices && element.prices.price && element.prices.price.value ? element.prices.price.value : 0;
            totalPrice = totalPrice + (element.quantity * value);
        });
        return addtoproductcart[0] ? getSampleCurrencyFormat("INR", totalPrice) : "0.00";
    };

    const getProductDiscount = () => {
        let totalDiscount = 0;
        cartPrices && cartPrices.discounts && cartPrices.discounts.forEach(element => {
            const value = element && element.amount && element.amount.value ? element && element.amount && element.amount.value : 0;
            totalDiscount = value;
        });

        return getSampleCurrencyFormat("INR", totalDiscount);

    }
    const getShippingAmount = () => {
        let shipping = 0;
        shippingAddresses && shippingAddresses.forEach(shipping_amount => {
            shipping = shipping_amount && shipping_amount.selected_shipping_method && shipping_amount.selected_shipping_method.amount && shipping_amount.selected_shipping_method.amount.value ? shipping_amount && shipping_amount.selected_shipping_method && shipping_amount.selected_shipping_method.amount && shipping_amount.selected_shipping_method.amount.value : 0;
        });
        return getSampleCurrencyFormat("INR",  shipping);
    }
    return (
        <>
            <div className="cart_right_block">

                <div className="coupon_option">
                    {appliedCoupon && appliedCoupon[0] && appliedCoupon[0].code ? (
                        <>
                            <label><img src="img/coupon.jpg" alt="" />Coupon applied</label>
                            <label for="">{appliedCoupon[0].code}</label>
                            <button className="couponCheck" onClick={() => removeCouponFromCart()}>Remove</button>
                        </>
                    ) : (
                        <>
                            <label><img src="img/coupon.jpg" alt="" />Apply Coupon</label>
                            <form ><input type="text" name="" id="" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                <button className="couponCheck" onClick={() => ApplyCoupons()}>Apply</button>
                            </form>
                        </>
                    )}
                </div>

                {/* <div className="coupon_option">
                    <label><i className="fa fa-gift"><FaGift /></i>Add Gift Certificate</label>
                    <form action=""><input type="text" name="" id="" /><button className="couponCheck">Add</button></form>
                </div> */}

                <div className="cart_subtotal_block">
                    <ul>
                        <li>
                            <label for="">Price</label>
                            <span>{getTotalAmount()}</span>
                        </li>
                        <li>
                            <label for="">Discount</label>
                            <span>
                                {getProductDiscount()}
                            </span>
                        </li>
                        {addtoproductcart[0] ? (
                            <li>
                                <label for="">Delivery Charges</label>
                                <span>{getShippingAmount()}</span>
                            </li>
                        ) : (
                            <></>
                        )}
                        <li>
                            <label for="">Total Amount</label>
                            <span> {getSampleCurrencyFormat("INR", cartPrices && cartPrices && cartPrices.grand_total && cartPrices.grand_total.value ? cartPrices && cartPrices && cartPrices.grand_total && cartPrices.grand_total.value : "0")}</span>
                        </li>
                     
                        <li className="saving_info">
                            You will save  {getProductDiscount()} on this order
                        </li>
                    </ul>
                    <div className="procede_cart">
                        <div className="cart_total">
                            <strong>Total</strong>
                            Rs. 48,000.00
                        </div>
                        <div className="proceede_btn">
                            <a className="btn default_button" href="/#/checkout">Checkout</a>
                        </div>
                    </div>
                </div>
            </div>


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
export default CartRightBlock;