import React from 'react';
import { getSampleCurrencyFormat } from '../../../utils/utils';

const ExtendOrderList = ({ id, Orderid, ProductName, FinalPrice, OldPrice, deliveryDate, status }) => {

    return (
        <>
            <div class="order_single_box">
                <a href={"/#/my-order/" + id} class="order_link">
                    <div class="order_id">
                        <strong>Order # {Orderid}</strong>
                    </div>

                    <div class="product_single_box">
                        <div class="product_img">
                            <img src="img/airpods-accessories.png" alt="" />
                        </div>
                        <div class="other_details">
                            <div class="product_name">
                                {ProductName}
                            </div>
                            <div class="product_price_row">
                                <div class="final_price">
                                    MRP: {FinalPrice} 
                                </div>
                                <div class="del_status notdelivered">
                                    Status: {status}
                                </div>

                                <div class="old_price_row">
                                    <span class="old_price">{OldPrice}</span>
                                </div>
                            </div>
                        </div>
                        <div class="delivery_info">
                            <div class="del_status notdelivered">
                                <i></i> Delivery by {deliveryDate}.
                            </div>
                            <div class="return_policy">
                                Product has no-return policy.
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default ExtendOrderList; 