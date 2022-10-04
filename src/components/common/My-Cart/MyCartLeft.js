import React, { useEffect, useState } from "react";
import "../../../assets/css/mycart.css";
// import "../../../assets/css/style.css";
import { FaMapMarker, FaHeart, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getSampleCurrencyFormat } from "../../../utils/utils";
import { saveaddtoproductcart } from '../../../features/HomePageSlice/homeDataSlice';
import { REMOVE_PRODUCT, GET_CUSTOMER_CART, UPDATE_CUSTOMER_CART } from '../../../assets/graphql';
import { apiHandler } from "../../../api";
import { endpoint } from "../../../api/endpoint";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const MyCartLeft = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addtoproductcart, customerresult } = useSelector((state) => state.home);
    console.log(addtoproductcart);
    const { token } = useSelector((state) => state.login);

    useEffect(() => {
        if (customerresult.id) {
            getLatestCartInfo(customerresult.id);
        }
    }, [customerresult]);
    const getLatestCartInfo = async (cartId) => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: GET_CUSTOMER_CART,
                    variables: { cart_id: cartId },
                },
            });
            setLoader(false);
            if (!result.data.message) {

                dispatch(
                    saveaddtoproductcart(result.data.cart)
                );
                // toast.success('Added Successfully');
            }
            else {
                // toast.error(result.data.message);
            }
        } else {
            navigate('/login');
        }
    };
    const RemoveToCart = async (id) => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        cart_id: customerresult.id,
                        cart_item_id: id
                    },
                    "query": REMOVE_PRODUCT
                },
            });
            setLoader(false);
            if (!result.data.status) {
                toast.success('Delete Successfull');
                getLatestCartInfo(customerresult.id);
            }
        }
        else {
            navigate('/login');
        }
    }
    const ReduceQuantity = async (uid, quantity) => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: UPDATE_CUSTOMER_CART,
                    variables: { cart_id: customerresult.id, cart_item_uid: uid, quantity: quantity - 1 },
                },
            });
            setLoader(false);
            if (!result.data.message) {
                getLatestCartInfo(customerresult.id);
            }
            else {
                // toast.error(result.data.message);
            }
        } else {
            navigate('/login');
        }
    };
    const AddQuantity = async (uid, quantity) => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: UPDATE_CUSTOMER_CART,
                    variables: { cart_id: customerresult.id, cart_item_uid: uid, quantity: quantity + 1 },
                },
            });
            setLoader(false);
            if (!result.data.message) {
                getLatestCartInfo(customerresult.id);
            }
            else {
                // toast.error(result.data.message);
            }
        } else {
            navigate('/login');
        }
    };
    return (
        <>

            {/* <div className="cart_leftBlock">
                    <div className="ship_to_pin">
                        <i className="fa fa-map-marker"><FaMapMarker/></i> ship to : 110006, delhi
                    </div>
                    <div className="product_grid cart_grid"> */}
            {addtoproductcart && addtoproductcart.map((cartitem, index) =>
                <div className="product_single_box cart_page ">
                    <div className="cart_prod_row">

                        <div className="product_img">
                            <a href=""><img src={cartitem.product.image && cartitem.product.image.url ? cartitem.product.image.url : ""} alt="" /></a>
                        </div>
                        <div className="other_details">
                            <div className="product_name">
                                <a href="#">{cartitem.product.name}</a>
                            </div>
                            <div className="product_price_row">
                                <div className="final_price">
                                    MRP: {getSampleCurrencyFormat(cartitem.product.price_range && cartitem.product.price_range.minimum_price && cartitem.product.price_range.minimum_price.final_price && cartitem.product.price_range.minimum_price.final_price.currency ? cartitem.product.price_range.minimum_price.final_price.currency : "INR", cartitem.prices && cartitem.prices.price && cartitem.prices.price.value ? cartitem.prices.price.value : 0)}
                                </div>
                                {cartitem.configurable_options && cartitem.configurable_options.map((opt, i) =>
                                    <small key={i} className="d-block text-muted">{opt.option_label}: {opt.value_label} </small>
                                )}
                                {cartitem.customizable_options && cartitem.customizable_options.map((option, i) =>
                                    <>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                {option.label ? option.label : ""} &nbsp;
                                            </div>
                                            <div>
                                                {option.values.map((val, i) =>
                                                    <div>
                                                        {" "} ({val.label ? val.label : ""})
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="cart_options">
                                <div className="addWishlist">
                                    <i className="fas fa-heart"><FaHeart /> </i>
                                    Save
                                </div>
                                <div className="cart_qty">
                                    Qty: <button onClick={() => ReduceQuantity(cartitem.uid, cartitem.quantity)} style={{ border: "none" }}> - </button>  {cartitem.quantity} <button onClick={() => AddQuantity(cartitem.uid, cartitem.quantity)} style={{ border: "none" }}> + </button>
                                    {/* <select name="qty" id="qty">
                                        {
                                            Array.from(Array(cartitem.quantity)).map((_, i) =>
                                                <option value={i + 1}>{i + 1}</option>
                                            )
                                        }
                                     
                                    </select> */}
                                </div>
                                <div className="delete_prod" onClick={() => RemoveToCart(cartitem.id)}>
                                    <i className="fas fa-trash"><FaTrash /></i> Remove
                                </div>
                            </div>
                        </div>
                        <div className="delivery_info">
                            <div className="delivery_details">
                                <img src="img/delivery.jpg" alt="" />
                                Delivery by 23rd Aug
                            </div>
                            <div className="return_policy">
                                Product has no-return policy.
                                <br /> Order Cancellation not allowed
                            </div>
                        </div>
                    </div>
                </div>
            )}


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
export default MyCartLeft;