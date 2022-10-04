import React, { useState, useEffect } from 'react';
import p1 from '../../../assets/img/product-details/p1.jpg';
import p2 from '../../../assets/img/product-details/p2.jpg';
import '../../../assets/css/product-details.css';
import {
    FaShoppingCart,
    FaCreditCard,
    FaHeart,
    FaBalanceScale,
} from 'react-icons/fa';
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
    GET_CUSTOMER_CART,
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

const ProductCarouselCard = ({ filterData, selectedFilterUid, step, selectedOptionUid, ids }) => {

    const FilterDatas = filterData;
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    const { productDetails } = useSelector((state) => state.home);
    const [loader, setLoader] = useState(false);

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

            }
            else {
                toast.error(result.data.message);
            }
        } else {
            navigate('/login');
        }
    };
    const AddToCart = async (e, isCheckout) => {
        e.preventDefault();
        e.stopPropagation();
        // Adding Filter options
        let selected_optiopns = [...Object.values(selectedFilterUid)];
        // // Adding other options
        if (Object.keys(selectedOptionUid).length > 0) {
            Object.keys(selectedOptionUid).forEach(k => {
                if (selectedOptionUid[k] && selectedOptionUid[k].status) {
                    selected_optiopns = [...selected_optiopns, k];
                }
            });
        }
        // console.log(selected_optiopns);
        if (token) {
            setLoader(true);
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
                        cartId: customerresult && customerresult.data && customerresult.data.customerCart && customerresult.data.customerCart.id ? customerresult.data.customerCart.id : "",
                        items: [
                            {
                                quantity: 1,
                                sku: id,
                                selected_options: selected_optiopns,
                            },
                        ],
                    },
                    query: ADD_TO_PRODUCT_CART,
                },
            });
            setLoader(false);
            console.log(result);
            if (!result.data.message) {
                // dispatch(
                //     saveaddtoproductcart(result.data.addProductsToCart.cart.items)
                // );
                getLatestCartInfo(customerresult.data.customerCart.id);

                toast.success('Added Successfully');
                if (isCheckout) navigate('/checkout');
            }
            else {
                toast.error(result.data.message);
            }
        } else {
            navigate('/login');
        }
    };
    const AddToWishlist = async (sharing_code) => {
        if (token) {
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
            if (!wishlistresult.data.message) {
                dispatch(savewishlist(wishlistresult.data.wishlist));
                addtocartwishlist(sharing_code)

            }
            else {
                toast.error(wishlistresult.data.message);
            }



            // if (!result.data.message) {
            //     dispatch(
            //         saveaddproductwishlist(result.data.addProductsToWishlist.wishlist.items_v2.items)

            //     );
            //     toast.success('Added Successfully');
            // }
            // else {
            //     toast.error(result.data.message);
            // }

        } else {
            navigate('/login');
        }
    };
    const addtocartwishlist = async (wishlistresult) => {
        console.log(wishlistresult);
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                base_url: endpoint.API_BASE_URL,
                variables: {
                    wishlistId: wishlistresult.data.wishlist.sharing_code,
                    wishlistItems: [
                        {
                            sku: id,
                            quantity: 1,
                            selected_options: Object.values(selectedFilterUid),
                        }
                    ]
                    // cartId: wishlistresult.data.wishlist.items.id,
                    // items: [
                    //     {
                    //         quantity: 1,
                    //         sku: id,
                    //         selected_options: [
                    //             'Y29uZmlndXJhYmxlLzkzLzUz',
                    //             'Y29uZmlndXJhYmxlLzE2MS8xNzQ=',
                    //         ],
                    //     },
                    // ],
                },
                query: ADD_CART_TO_WISHLIST,
            },

        });
        setLoader(false);

    }
    const getProductDetailUid = () => {
        let prductUid = "";
        productDetails &&
            productDetails.map((product, index) => {
                const { variants } = product;
                // let productName = product.name;
                // let priceRange = product.price_range;
                prductUid = product.uid;


                let optionEnabled = false;
                let optionPrice = 0;

                if (Object.keys(selectedOptionUid).length > 0) {
                    Object.keys(selectedOptionUid).forEach(k => {
                        if (selectedOptionUid[k] && selectedOptionUid[k].status) {
                            optionEnabled = true;
                            optionPrice = optionPrice + selectedOptionUid[k].price;
                        }
                    });
                }

                if (Object.values(selectedFilterUid).length > 0) {
                    console.log(selectedFilterUid);
                    // filter product
                    let prod = variants.filter(v => {
                        let result = true;
                        Object.values(selectedFilterUid).forEach(uid => {
                            const match = v.attributes.find(a => uid === a.uid);
                            if (!match) result = false;
                        });
                        return result;
                    });
                    console.log(prod);

                    if (prod[0]) {
                        // productName = prod[0].product.name;
                        // priceRange = prod[0].product.price_range;
                        prductUid = prod[0].product.uid;
                        console.log(prductUid)
                    }
                }
            });
        return prductUid;
    };

    const AddToCompare = async () => {
        if (token) {

            const compareresult = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    variables: {
                        uid: getProductDetailUid()
                    },
                    query: GET_COMPARE_LIST,
                },
            });

            // if (!compareresult.data.message) {
            //     dispatch(savegetcomparelist(compareresult));
            //     console.log(compareresult);
            // }

            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    base_url: endpoint.API_BASE_URL,
                    variables: {
                        products: [ids]
                    },
                    query: CREATE_COMPARE_LIST,
                },
            });
            if (!result.data.message) {
                dispatch(savecreatecomparelist(result));
                console.log(result);
            }



        } else {
            navigate('/login');
        }
    }

    const ProductDetailName = () => {
        return (
            productDetails &&
            productDetails.map((product, index) => {
                const { variants } = product;
                let productName = product.name;
                let priceRange = product.price_range;

                let optionEnabled = false;
                let optionPrice = 0;

                if (Object.keys(selectedOptionUid).length > 0) {
                    Object.keys(selectedOptionUid).forEach(k => {
                        if (selectedOptionUid[k] && selectedOptionUid[k].status) {
                            optionEnabled = true;
                            optionPrice = optionPrice + selectedOptionUid[k].price;
                        }
                    });
                }

                if (Object.values(selectedFilterUid).length > 0) {
                    // filter product
                    let prod = variants.filter(v => {
                        let result = true;
                        Object.values(selectedFilterUid).forEach(uid => {
                            const match = v.attributes.find(a => uid === a.uid);
                            if (!match) result = false;
                        });
                        return result;
                    });

                    if (prod[0]) {
                        productName = prod[0].product.name;
                        priceRange = prod[0].product.price_range;
                    }
                }

                return (
                    <React.Fragment key={index}>
                        <h3>{productName}</h3>
                        <p>
                            <small>Offer Price</small>{' '}
                            <span>
                                {getSampleCurrencyFormat(
                                    priceRange.minimum_price.final_price.currency ? priceRange.minimum_price.final_price.currency : "",
                                    priceRange.minimum_price.final_price.value ? optionEnabled ? priceRange.minimum_price.final_price.value + optionPrice : priceRange.minimum_price.final_price.value : ""
                                )}
                                /-
                            </span>
                        </p>
                    </React.Fragment>
                )
            })
        );
    };
    const ProductCarouselImage = (products) => {
        return (
            products &&
            products.map((product, index) => {
                const { variants } = product;
                let image = product.image;

                if (Object.values(selectedFilterUid).length > 0) {
                    // filter product
                    let prod = variants.filter(v => {
                        let result = true;
                        Object.values(selectedFilterUid).forEach(uid => {
                            const match = v.attributes.find(a => uid === a.uid);
                            if (!match) result = false;
                        });
                        return result;
                    });

                    if (prod[0]) {
                        image = prod[0].product.image;
                    }
                }

                return (
                    <React.Fragment key={index}>
                        <div className="carousel-item active" style={{ height: "500px" }}>
                            <img
                                src={image.url ? image.url : ""}
                                alt={image.label ? image.label : ""}
                                className="d-block img-fluid"
                            />
                        </div>
                    </React.Fragment>
                )
            })
        );
    };

    const BuyNow = () => {
        navigate("/checkout");
    }
    return (
        <>
            {/* <h5>Apple Watch</h5> */}
            {ProductDetailName()}
            {/* {productDetails && productDetails.map((product, index) =>
                <>
                    <h3>{product.name}</h3>

                    <p><small>Offer Price</small> <span>{getSampleCurrencyFormat(product.price_range.minimum_price.regular_price.currency, product.price_range.minimum_price.regular_price.value)}/-</span></p>
                </>
            )} */}
            {/* <!-- Carousel --> */}
            <div id="demo" className="carousel slide productdetailslider" data-bs-ride="carousel">
                {/* <!-- Indicators/dots --> */}
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="0"
                        className="active"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="2"
                    ></button>
                </div>

                {/* <!-- The slideshow/carousel --> */}
                <div className="carousel-inner">
                    {ProductCarouselImage(productDetails)}
                    {/* <div className="carousel-item active">
                        <img src={p1} alt="Los Angeles" className="d-block img-fluid" />
                    </div> */}
                    {/* <div className="carousel-item">
                        <img src={p2} alt="Chicago" className="d-block img-fluid" />
                    </div> */}
                </div>

                {/* <!-- Left and right controls/icons --> */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            <div className="d-flex align-items-center cartadd ">

                <button className="addtocart btn-cus me-2" onClick={(e) => AddToCart(e, false)} disabled={step < FilterDatas && FilterDatas.length - 1} >
                    <i className="fas fa-shopping-cart">
                        {' '}
                        <FaShoppingCart />
                    </i>{' '}
                    ADD TO Cart
                </button>
                <button className="buynow btn-cus me-2" onClick={(e) => AddToCart(e, true)} disabled={step < FilterDatas && FilterDatas.length - 1} >
                    <i className="fas fa-credit-card">
                        <FaCreditCard />{' '}
                    </i>{' '}
                    Buy Now
                </button>
                <button className=" btn-cus me-2" onClick={() => AddToWishlist()} disabled={step < FilterDatas && FilterDatas.length - 1}>
                    <i className="fas fa-heart pe-1">
                        {' '}
                        <FaHeart />
                    </i>{' '}
                    ADD TO WISHLIST
                </button>
                <button className=" btn-cus" onClick={() => AddToCompare()} >
                    <i className="fa fa-balance-scale">
                        <FaBalanceScale />{' '}
                    </i>{' '}
                    Add to Compare
                </button>
            </div>

            <div className="productDis">
                <div className="accordion" id="accordionExampleDis">
                    <div
                    // className="accordion-item"
                    >
                        <h2 className="accordion-header" id="headingDis">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseDis"
                                aria-expanded="false"
                                aria-controls="collapseDis"
                            >
                                Product Description
                            </button>
                        </h2>

                        <div
                            id="collapseDis"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingDis"
                            data-bs-parent="#accordionExampleDis"
                        >
                            {productDetails &&
                                productDetails.map((product, index) => (
                                    <div className="accordion-body" key={index}>
                                        <p dangerouslySetInnerHTML={{ __html: product.short_description.html }}>
                                            {/* {product.short_description && product.short_description.html
                                                ? product.short_description.html
                                                : ''} */}
                                        </p>
                                    </div>
                                ))}
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
    );
};
export default ProductCarouselCard;
