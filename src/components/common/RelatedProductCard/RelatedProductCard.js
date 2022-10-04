import React from "react";
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
    savecustomerresult,
    saveaddtoproductcart,
    saveaddproductwishlist,
    savewishlist,
    savegetcomparelist,
    savecreatecomparelist
} from '../../../features/HomePageSlice/homeDataSlice';
import { endpoint } from '../../../api/endpoint';
import { apiHandler } from '../../../api';
import {
    PRODUCT_DETAILS,
    ADD_TO_PRODUCT_CART,
    CUSTOMER_CART,
    GETWISHLIST,
    ADD_CART_TO_WISHLIST,
    GET_COMPARE_LIST,
    CREATE_COMPARE_LIST
} from '../../../assets/graphql';
import { useDispatch } from 'react-redux';
import { getSampleCurrencyFormat } from '../../../utils/utils';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RelatedProductCard = ({ skuid, PrductImg, ProductDetail, ProductPrice,filterData, selectedFilterUid, step}) => {
    
    const FilterDatas = filterData;
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);

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
            // const cartData = {
            //     cartId: customerresult.data.id,
            //     cartItems: [...customerresult.data.items, {
            //         quantity: 1,
            //         sku: id,
            //         selected_options: ["Y29uZmlndXJhYmxlLzkzLzUz","Y29uZmlndXJhYmxlLzE2MS8xNzQ="]
            //     }]
            // };

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
                                sku: id,
                                selected_options: Object.values(selectedFilterUid),
                            },
                        ],
                    },
                    query: ADD_TO_PRODUCT_CART,
                },
            });
            if (!result.data.message) {
                dispatch(
                    saveaddtoproductcart(result.data.addProductsToCart.cart)
                );
                toast.success('Added Successfully');
            }
            else {
                toast.error(result.data.message);
            }
           
        } else {
            navigate('/login');
        }
    };
    return (
        <>
            <div className="accessoriesproductbox">
                <div className="productImg">
                    <img src={PrductImg} className="img-fluid" style={{ display:"block",margin:"0px auto" }} />
                    <span className="newtag">NEW</span>
                </div>
                <div className="productDetails">
                    <h5>{ProductDetail}</h5>
                    <strong>Offer Price : <b> {ProductPrice}/- </b> (Incl. of all taxes)  </strong>
                    <div style={{textAlign:"center"}}>
                    <a className="btn custombutton"
                    //  href={"/#/product-detail/" + skuid}
                     ><i className="fas fa-shopping-cart"><FaEye /></i> Learn More</a>
                    </div>
                    {/* <button className="btn custombutton" onClick={()=>AddToCart()} disabled={step < FilterDatas.length - 1}><i className="fas fa-eye"><FaShoppingCart /></i> Add to Cart</button> */}

                </div>
            </div>
        </>
    )
}
export default RelatedProductCard;