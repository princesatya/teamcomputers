import React, { useEffect, useState } from "react";
import { FaMapMarker, FaHeart, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_PRODUCT, GET_CUSTOMER_CART, UPDATE_CUSTOMER_CART } from '../../../assets/graphql';
import { saveaddtoproductcart } from '../../../features/HomePageSlice/homeDataSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { apiHandler } from "../../../api";
import { endpoint } from "../../../api/endpoint";


const CardItem = ({ ids, airPods, AirPodsTitle, Quantity, uid, Payment, configurable_options, OptionLabel, ValueLabel }) => {
    const { addtoproductcart, customerresult } = useSelector(
        (state) => state.home
    );
    const [loader, setLoader] = useState(false);
    // console.log(addtoproductcart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    useEffect(() => {
        if (customerresult && customerresult.id) {
            getLatestCartInfo(customerresult && customerresult.id);
        }
    }, [customerresult]);


    const addQuantity = (uid, Quantity) => {
        updateCartItems(uid, Quantity + 1);
    }

    const removeQuantity = (uid, Quantity) => {
        updateCartItems(uid, Quantity - 1);
    }

    const updateCartItems = async (uid, newQuantity) => {
        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    query: UPDATE_CUSTOMER_CART,
                    variables: { cart_id: customerresult.id, cart_item_uid: uid, quantity: newQuantity },
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

    return (
        <>
            {/* <!-- cart item--> */}
            <div className="navbar-cart-product">
                <div className="d-flex align-items-center">
                    <a href=""><img className="img-fluid navbar-cart-product-image" src={airPods} alt="..." /></a>
                    <div className="w-100"><a className="navbar-cart-product-close" href="#"><i className="fas fa-trash"></i></a>
                        <div className="ps-3">
                            <a className="navbar-cart-product-link" href="">{AirPodsTitle}</a>
                            <small className="d-block text-muted">Quantity : <button style={{ border: "none" }}
                                onClick={() => removeQuantity(uid, Quantity)}
                            > - </button> {Quantity} <button style={{ border: "none" }}
                                onClick={() => addQuantity(uid, Quantity)}
                            > + </button></small>
                            {configurable_options && configurable_options.map((opt, i) =>
                                <small key={i} className="d-block text-muted">{opt.option_label}: {opt.value_label} </small>
                            )}
                            <strong className="d-block text-sm">{Payment} </strong>
                        </div>
                        <div className="delete_prod"
                            onClick={() => RemoveToCart(ids)}
                        >
                            <i className="fas fa-trash"><FaTrash /></i> Remove
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
export default CardItem;