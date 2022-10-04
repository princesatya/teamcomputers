import React, { useState, useEffect } from 'react';
import "../../../assets/css/wishlist.css";
// import "../../../assets/css/fontawesome.css";
import { FaTrash } from 'react-icons/fa';
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

const WishlistSectionCard = ({ ids, sku, wishlist_img, ProductName, final_price, Amount, Discount }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    const { addtoproductcart, wishlist,productDetails } = useSelector(
        (state) => state.home
    );
    const [filter, setFilter] = useState([]);
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
    
    // useEffect(() => {

    //     if (productDetails && productDetails[0] && productDetails[0].id) {
    //       const { configurable_options } = productDetails[0];
    //       const filterOptions = configurable_options && configurable_options.map(conf => {
    //         const conf_options = conf.values.map(v => {
    //           return {
    //             label: v.label,
    //             uid: v.uid,
    //             value: v.swatch_data
    //           }
    //         });
    //         return {
    //           attribute_code: conf.attribute_code,
    //           label: conf.label,
    //           options: conf_options
    //         };
    //       });
    
    //       setFilter(filterOptions);
    //     }
    //   }, [productDetails])

    const RemoveWishlist = async (ids) => {
       
        if (token) {
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
        if (!wishlistresult.data.error_code) {
            dispatch(savewishlist(wishlistresult.data.wishlist));
            
        }
    };
    return (
        <>

            <div className="product_single_box wishlist_page">
                <div className="product_img">
                    <a href="#"><img src={wishlist_img} alt="" /></a>
                    <div className="share_options"
                        onClick={() => RemoveWishlist(ids)}
                    >
                        <span className="delete">
                            <i className="fa "><FaTrash /></i>
                        </span>
                    </div>
                </div>
                <div className="other_details">
                    <div className="product_name">
                        <a href="#">{ProductName}</a>
                    </div>
                    <div className="product_price_row">
                        <div className="final_price"> MRP: {final_price}</div>
                    </div>

                    <div className="your_saving_row" >
                        You Save: <span>{Amount}</span>
                        <span className="discount">({Discount})</span>
                        <span className="taxes">(Incl. of all taxes)</span>
                    </div>

                    <a className="btn default_button" onClick={() => AddToCart()}>Add to Cart</a>
                </div>
            </div>



        </>
    )
}
export default WishlistSectionCard;