import React, { useEffect } from 'react';
import "../../assets/css/mycart.css"
import WishlistSectionCard from "../../components/common/Wishlist-Section-Card/Wishlist-Section-Card";
import { useDispatch, useSelector } from 'react-redux';
import { GETWISHLIST } from '../../assets/graphql';
import { savewishlist } from "../../features/HomePageSlice/homeDataSlice";
import { endpoint } from "../../api/endpoint";
import { apiHandler } from "../../api";
import { Token } from 'graphql';
import { getSampleCurrencyFormat } from "../../utils/utils";
import { useState } from 'react';



const WishlistSection = () => {
    const [ wishlistData, setWishlistData] = useState("");
    const { token } = useSelector((state) => state.login);
    
    const { wishlist } = useSelector(
        (state) => state.home
    );

    const dispatch = useDispatch();
    // console.log(wishlist);
    const getWishlist = async () => {
        if (token) {
            // setLoader(true);
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
            // setLoader(false);
            // if (wishlistresult.data.wishlist) {
            //     dispatch(savewishlist(wishlistresult.data.wishlist));
            //     toast.success('Added Successfully');
            //     console.log(wishlistresult.data.wishlist);

            //     addtocartwishlist(wishlistresult);
            // }
            // else {
            //     toast.error(wishlistresult.data.message);
            // }



            // if (!result.data.message) {
            //     dispatch(
            //         saveaddproductwishlist(result.data.addProductsToWishlist.wishlist.items_v2.items)

            //     );
            //     toast.success('Added Successfully');
            // }
            // else {
            //     toast.error(result.data.message);
            // }

        } 
        // else {
        //     navigate('/login');
        // }
    };
    useEffect(() => {
        getWishlist()
      }, []);

    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">Wishlist</li>
                    </ul>
                </div>
            </section>
            <section className="cart_wrap">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>Wishlist</h2>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        {wishlist && wishlist.items && wishlist.items.map((wishlistdatas, index) =>
                            <div className="col-lg-4" key={index}>

                                <WishlistSectionCard
                                    ids={wishlistdatas.id}
                                    sku={wishlistdatas.product.sku}
                                    ProductName={wishlistdatas.product.name}
                                    wishlist_img={wishlistdatas.product.image.url ? wishlistdatas.product.image.url : ""}
                                    final_price={getSampleCurrencyFormat(wishlistdatas.product.price_range.minimum_price.final_price.currency, wishlistdatas.product.price_range.minimum_price.final_price.value)}
                                //  Amount={wishlistdatas.Amount?wishlistdatas.Amount:""} 

                                //  Discount={wishlistdatas.Discount?wishlistdatas.Discount:""} 
                                />
                            </div>
                        )}

                    </div>

                </div>

            </section>



        </>
    )
}
export default WishlistSection;