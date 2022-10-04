import React, { useEffect, useState } from 'react';
import '../../assets/css/checkout.css';
import Checkout_Left_Block from '../../components/common/Checkout-Page/Checkout-Left-Block';
import Checkout_Right_block from '../../components/common/Checkout-Page/Checkout-Right-block';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { GENERATE_HASH } from "../../assets/graphql";
import { useSelector } from 'react-redux';

const Checkout = () => {
    const [showCheckoutform, setShowcheckOutform] = useState(false);
    const [paymentData, setPaymentData] = useState({});
    const { token } = useSelector((state) => state.login);

    const showCheckOut = async (data) => {
        // console.log('DATA - ', data);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": data,
                "query": GENERATE_HASH
            },
        });
        console.log(result.data);
        // let res = {
          
        //         "generatePinelabsHash": {
        //             "status": "1",
        //             "message": "Hash generated",
        //             "gateway_url": "https://uat.pinepg.in/PinePGRedirect/",
        //             "formdata": {
        //                 "ppc_MerchantID": "106598",
        //                 "ppc_Amount": "49900",
        //                 "ppc_UniqueMerchantTxnID": "20220909081511",
        //                 "ppc_MerchantAccessCode": "4a39a6d4-46b7-474d-929d-21bf0e9ed607",
        //                 "ppc_TransactionType": "1",
        //                 "ppc_NavigationMode": "2",
        //                 "ppc_LPC_SEQ": "1",
        //                 "ppc_MerchantReturnURL": "http://13.68.224.224/pub/pinelabs/ResponsePage.php",
        //                 "ppc_DIA_SECRET": "C58BF6EFE6186AAFE93613D81C73CEE91A0D43B4C6768E704BF7CEA309230594",
        //                 "ppc_Product_Code": "SKU 123",
        //                 "ppc_PayModeOnLandingPage": "1,4,10",
        //                 "ppc_DIA_SECRET_TYPE": "SHA256",
        //                 "ppc_MerchantProductInfo": "SKU 123",
        //                 "ppc_CustomerFirstName": "SK",
        //                 "ppc_CustomerLastName": "YADAV",
        //                 "ppc_CustomerMobile": "9726078792",
        //                 "ppc_CustomerEmail": "santoshy@futuresoftindia.com",
        //                 "ppc_CustomerAddress1": " B 130 ",
        //                 "ppc_CustomerAddress2": "Street 2",
        //                 "ppc_CustomerAddressPIN": "201301",
        //                 "ppc_CustomerCity": "noida",
        //                 "ppc_CustomerState": "UP",
        //                 "ppc_CustomerCountry": "IN",
        //                 "ppc_ShippingFirstName": "SK",
        //                 "ppc_ShippingLastName": "YADAV",
        //                 "ppc_ShippingAddress1": " B 131 ",
        //                 "ppc_ShippingAddress2": "Street 3",
        //                 "ppc_ShippingCity": "noida",
        //                 "ppc_ShippingState": "UP",
        //                 "ppc_ShippingCountry": "IN",
        //                 "ppc_ShippingZipCode": "201301",
        //                 "ppc_ShippingPhoneNumber": "9726078792"
        //             }
        //         }
            
        // }
        setPaymentData(result.data.generatePinelabsHash);
        console.log(result.data);
        setShowcheckOutform(true);
    }
    return (

        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active" >Checkout</li>
                    </ul>
                </div>
            </section>

            <section className="cart_wrap checkoutpage">

                <div className="container">

                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <Checkout_Left_Block setPaymentData={showCheckOut} />
                        </div>
                        <div className="col-lg-4">
                            <Checkout_Right_block showCheckoutform={showCheckoutform} hideCheckoutform={() => setShowcheckOutform(false)} paymentData={paymentData} />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Checkout;