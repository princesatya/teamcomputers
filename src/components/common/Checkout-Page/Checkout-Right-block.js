import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSampleCurrencyFormat } from '../../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout_Right_block = ({ showCheckoutform, hideCheckoutform, paymentData }) => {
    console.log(paymentData);
    const { addtoproductcart, cartPrices, shippingAddresses } = useSelector((state) => state.home);
    console.log(cartPrices);
    // const getTotalAmount = () => {
    //     let totalPrice = 0;
    //     addtoproductcart && addtoproductcart.forEach(cartitem => {
    //         if (cartitem && cartitem.prices && cartitem.prices.price && cartitem.prices.price.value) {
    //             totalPrice = totalPrice + (cartitem.quantity * cartitem.prices.price.value);
    //         }
    //     });
    //     return addtoproductcart[0] ? getSampleCurrencyFormat("INR", totalPrice) : "0.00";
    // };
    const getShippingAmount = () => {
        let shipping = 0;
        shippingAddresses && shippingAddresses.forEach(shipping_amount => {
            shipping = shipping_amount && shipping_amount.selected_shipping_method && shipping_amount.selected_shipping_method.amount && shipping_amount.selected_shipping_method.amount.value ? shipping_amount && shipping_amount.selected_shipping_method && shipping_amount.selected_shipping_method.amount && shipping_amount.selected_shipping_method.amount.value : 0;
        });
        return getSampleCurrencyFormat("INR", shipping ? shipping : 0);
    }
    const checkoutProcess = () => {
        if (paymentData.response_code == "1") {
            // console.log(paymentData.response_code);
            window.location.href = paymentData.redirect_url;
            // console.log(paymentData.redirect_url);
        } else (
            toast.error(paymentData.response_message)
        )
    }
    return (
        <>
            <div className="cart_right_block">
                <div className="cart_subtotal_block">
                    <ul>
                        <li>
                            <label for="">Price</label>
                            <span>{getSampleCurrencyFormat("INR", cartPrices && cartPrices && cartPrices.subtotal_excluding_tax && cartPrices.subtotal_excluding_tax.value ? cartPrices && cartPrices && cartPrices.subtotal_excluding_tax && cartPrices.subtotal_excluding_tax.value : "0")}</span> </li>
                        <li>
                            <label for="">Discount</label>
                            <span>{getSampleCurrencyFormat("INR",cartPrices && cartPrices.discounts ? cartPrices && cartPrices.discounts : "0")}</span> </li>
                        <li>
                            <label for="">Delivery Charges</label>
                            <span>{getShippingAmount()}</span> </li>
                        <li>
                            <label for="">Total Amount</label>
                            <span> {getSampleCurrencyFormat("INR", cartPrices && cartPrices && cartPrices.grand_total && cartPrices.grand_total.value ? cartPrices && cartPrices && cartPrices.grand_total && cartPrices.grand_total.value : "0")}</span> </li>
                    </ul>

                    {showCheckoutform ? (
                        <>
                            {/* <form name="pine1"
                                action="{paymentData.redirect_url}"
                                id="pine1"
                                method="POST"
                            > */}
                            <div className="procede_cart">
                                <div className="proceede_btn"> <button className="continuebutton" disabled={!showCheckoutform} onClick={() => checkoutProcess()}>Checkout</button> </div>
                            </div>
                            {/* <div
                        style={{ margin: "20px 40px 10px 130px", textAlign: "center", color: "blue" }}
                    >
                        <input type="hidden" name="ppc_MerchantID"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_MerchantID) || ""}
                        />
                        <input type="hidden" name="ppc_Amount"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_Amount) || ""}
                        />
                        <input type="hidden" name="ppc_UniqueMerchantTxnID"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_UniqueMerchantTxnID) || ""}
                        />
                        <input type="hidden" name="ppc_MerchantAccessCode"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_MerchantAccessCode) || ""}
                        />
                        <input type="hidden" name="ppc_TransactionType"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_TransactionType) || ""}
                        />
                        <input type="hidden" name="ppc_NavigationMode"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_NavigationMode) || ""}
                        />
                        <input type="hidden" name="ppc_LPC_SEQ"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_LPC_SEQ) || ""}
                        />
                        <input type="hidden" name="ppc_MerchantReturnURL"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_MerchantReturnURL) || ""}
                        />
                        <input type="hidden" name="ppc_DIA_SECRET"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_DIA_SECRET) || ""}
                        />
                        <input type="hidden" name="ppc_Product_Code"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_Product_Code) || ""}
                        />
                        <input type="hidden" name="ppc_PayModeOnLandingPage"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_PayModeOnLandingPage) || ""}
                        />
                        <input type="hidden" name="ppc_DIA_SECRET_TYPE"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_DIA_SECRET_TYPE) || ""}
                        />
                        <input type="hidden" name="ppc_MerchantProductInfo"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_MerchantProductInfo) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerFirstName"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerFirstName) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerLastName"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerLastName) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerMobile"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerMobile) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerEmail"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerEmail) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerAddress1"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerAddress1) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerAddress2"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerAddress2) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerAddressPIN"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerAddressPIN) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerCity"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerCity) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerState"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerState) || ""}
                        />
                        <input type="hidden" name="ppc_CustomerCountry"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerCountry) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingFirstName"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingFirstName) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingLastName"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingLastName) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingAddress1"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingAddress1) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingAddress2"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingAddress2) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingCity"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingCity) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingState"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingState) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingCountry"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingCountry) || ""
                            }
                        />
                        <input type="hidden" name="ppc_ShippingZipCode"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_ShippingZipCode) || ""}
                        />
                        <input type="hidden" name="ppc_ShippingPhoneNumber"
                            value={(paymentData && paymentData.formdata && paymentData.formdata.ppc_CustomerMobile) || ""}
                        />
                    </div> */}
                            {/* </form> */}
                        </>
                    ) : (
                        <div className="procede_cart">
                            <div className="proceede_btn"> <button className="continuebutton" disabled={true} onClick={() => checkoutProcess()}>Checkout</button> </div>
                        </div>
                    )}
                </div>
            </div>
        </>


    )
}

export default Checkout_Right_block