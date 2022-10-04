import React, { useEffect, useState } from 'react';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { useNavigate } from 'react-router-dom';
import {
  CHECK_PAYMENT_STATUS,
  PLACE_ORDER,
  UPDATE_ORDER,
  CUSTOMER_CART,
} from '../../assets/graphql';
import {
  saveOrderItems,
  savecustomerresult,
} from '../../features/HomePageSlice/homeDataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';

const Checkoutform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.login);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const { customerresult, shippingAddress } = useSelector(
    (state) => state.home
  );
  console.log(customerresult);
  const location = useLocation();

  const getCheckPaymentMethod = async () => {
    const values = queryString.parse(location.search);
    console.log(location, values);
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      authToken: token,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: { ...values },
        query: CHECK_PAYMENT_STATUS,
      },
    });
    setLoader(false);
    console.log(result);
    if (
      result &&
      result.data &&
      result &&
      result.data.checkpaymentstatus.status == '4'
    ) {
      getOrderPlace(result.data.checkpaymentstatus.transaction_id);
    } else {
      toast.error('There is error in payment');
      setMessage('There is error in payment');
    }
  };
  const getOrderPlace = async (transaction_id) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      authToken: token,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: { card_id: customerresult.id },
        query: PLACE_ORDER,
      },
    });
    setLoader(false);
    console.log(result.data);
    if (result.data.placeOrder) {
      updateOrderToCart(
        result.data.placeOrder.order.order_number,
        transaction_id
      );
    }
  };
  const updateOrderToCart = async (order_id, transaction_id) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      authToken: token,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: {
          order_id: order_id,
          payment_response: JSON.stringify({
            ppc_PinePGTransactionID: transaction_id,
          }),
        },
        query: UPDATE_ORDER,
      },

    });
    setLoader(false);
    console.log(result.data);
    if (result.data.updatePaymentInformation) {
      dispatch(saveOrderItems(result.data.updatePaymentInformation.response));
      getCustomerCartDetails();
    }
  };
  const getCustomerCartDetails = async () => {
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
      setLoader(false);
      if (!customerresult.data.error_code) {
        dispatch(savecustomerresult(customerresult.data.customerCart));
        navigate('/order-listing');
      }
    }
  };
  useEffect(() => {
    if (location) {
      getCheckPaymentMethod();
    }
  }, [location]);

  return (
    <>
      <section className="custombreadcrumb"></section>
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
              <div className="mainsection-title">
                <h2>Payment is in progress</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {message}

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
export default Checkoutform;
