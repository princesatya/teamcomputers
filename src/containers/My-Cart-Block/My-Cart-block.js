import React from "react";
import MyCartLeft from "../../components/common/My-Cart/MyCartLeft";
import CartRightBlock from "../../components/common/My-Cart/Cart-Right-Block";
import { useDispatch, useSelector } from 'react-redux';
import MyCartNote from "../../components/common/My-Cart/My-Cart-Note";
import { FaMapMarker, FaHeart, FaTrash } from 'react-icons/fa';

const MyCartBlock = () => {

    // const { mycart } = useSelector(
    //     (state) => state.home
    // );
   

    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">My Cart</li>
                    </ul>
                </div>
            </section>
            <section className="cart_wrap">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>My Cart</h2>
                            </div>
                        </div>
                    </div>


                    <div className="row cart_details_box">
                        <div className="col-md-12 col-lg-8">
                            <div className="cart_leftBlock">
                                {/* <div className="ship_to_pin">
                                    <i className="fa fa-map-marker"><FaMapMarker /></i> ship to : 110006, delhi
                                </div> */}
                                <div className="product_grid cart_grid">
                                    {/* {mycart && mycart.map (()=> */}
                                    <>
                                        <MyCartLeft />
                                    </>
                                    {/* )} */}
                                </div>
                                <MyCartNote />
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                            <CartRightBlock />
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
export default MyCartBlock;