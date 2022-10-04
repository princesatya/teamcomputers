import React, { useState, useEffect } from 'react';
import "../../../assets/css/wishlist.css";
// import "../../../assets/css/fontawesome.css";

import { useSelector } from 'react-redux';
import {
    savecustomerresult,
    saveaddtoproductcart,
    saveaddproductwishlist,
    savewishlist
} from '../../../features/HomePageSlice/homeDataSlice';
import { endpoint } from '../../../api/endpoint';
import { apiHandler } from '../../../api';
import {
    PRODUCT_DETAILS,
    ADD_TO_PRODUCT_CART,
    CUSTOMER_CART,
    REMOVE_PRODUCT_FROM_WISHLIST,
    GETWISHLIST
} from '../../../assets/graphql';
import { useDispatch } from 'react-redux';
import { getSampleCurrencyFormat } from '../../../utils/utils';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const MyWishlistCard = ({ ids, sku, ProductImg, ProductPrice }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    const { addtoproductcart, wishlist } = useSelector(
        (state) => state.home
    );
    const AddToCart = async () => {
        if (token) {
            const customerresult = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    variables: {},
                    query: CUSTOMER_CART,
                },
            });

            if (!customerresult.data.error_code) {
                dispatch(savecustomerresult(customerresult.data.customerCart));

            }
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    variables: {
                        cartId: customerresult.data.customerCart.id,
                        items: [
                            {
                                quantity: 1,
                                sku: sku,
                                selected_options: [
                                    'Y29uZmlndXJhYmxlLzkzLzUz',
                                    'Y29uZmlndXJhYmxlLzE2MS8xNzQ=',
                                ],
                            },
                        ],
                    },
                    query: ADD_TO_PRODUCT_CART,
                },
            });
            if (!result.data.error_code) {
                dispatch(
                    saveaddtoproductcart(result.data.addProductsToCart.cart)
                );

            }
        } else {
            navigate('/login');
        }
    };

    const RemoveWishlist = async (ids) => {

        if (token) {
            setLoader(true);
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        wishlistId: wishlist.sharing_code,
                        wishlistItemsIds: [ids]
                    },
                    "query": REMOVE_PRODUCT_FROM_WISHLIST
                },
            });
            setLoader(false);
            if (!result.data.status) {
                toast.success('Delete Successfull');
                getWishListData();
            }
        }
        else {
            navigate('/login');
        }
    }
    const getWishListData = async () => {
        setLoader(true);
        const wishlistresult = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                base_url: endpoint.API_BASE_URL,
                variables: {},
                query: GETWISHLIST,
            },
        });
        setLoader(false);
        if (!wishlistresult.data.error_code) {
            dispatch(savewishlist(wishlistresult.data.wishlist));

        }
    };
    return (
        <>


            <div className="col-md-6">
                <div className="accessoriesproductbox productboxstyle">
                    <div className="productImg">
                        <img src={ProductImg} className="img-fluid" style={{
                            display: "block",
                            margin: "0px auto"
                        }} />
                    </div>
                    <div className="productDetails">

                        <strong className="text-center">Offer Price : <b> {ProductPrice}</b> </strong>
                        <div className="row">
                            <div className="col-md-6 text-left" onClick={() => RemoveWishlist(ids)} ><i className="fa fa-trash"><FaTrash /></i></div>
                            <div className="col-md-6 text-right"><a className="btn custombutton d-block bg-white" onClick={() => AddToCart()}><i className="fas fa-shopping-cart"><FaShoppingCart /></i> Add To Cart</a></div>
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
export default MyWishlistCard;