import React from 'react';
import { getSampleCurrencyFormat } from '../../../utils/utils';
import { FaEye  } from 'react-icons/fa';

const OrderList = ({ Orderid, ProductName, FinalPrice, OldPrice, quantity, deliveryDate,productImg, status }) => {

    return (
        <>
            <div className="order_single_box">
                <div className="order_id">
                    <strong>Order # {Orderid}</strong>
                </div>

                <div className="product_single_box">
                    <div className="product_img">
                        <img src={productImg} alt="" />
                    </div>
                    <div className="other_details">
                        <div className="product_name">
                            {ProductName}
                        </div>
                        <div className="product_name">
                            Quantity: {quantity}
                        </div>
                        <div className="product_price_row">
                            <div className="final_price">
                                MRP: {getSampleCurrencyFormat("INR", FinalPrice)}
                            </div>
                            <div className="old_price_row">
                                <span className="old_price">{OldPrice}</span>
                            </div>
                            <div className="old_price_row">
                                <span className="old_price">{status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="delivery_info">
                        <div className="del_status notdelivered">
                            <i></i> Delivery by {deliveryDate}.
                        </div>
                        <div className="return_policy">
                            Product has no-return policy.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderList; 