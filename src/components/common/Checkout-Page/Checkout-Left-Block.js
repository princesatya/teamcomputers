import React, { useEffect, useState } from 'react';
// import Modal from './modal';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddressModal from './AddressModal';
import { apiHandler } from '../../../api';
import { endpoint } from '../../../api/endpoint';
import { getSampleCurrencyFormat } from '../../../utils/utils';
import {
  CREATE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
  GET_ADDRESS_LIST,
  CUSTOMERDATA,
  SHIPPING_METHOD,
  AVAILABLE_PAYMENT_METHOD,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_METHOD,
  SET_SHIPPING_ADDRESS,
  SET_BILLING_ADDRESS,
  GET_CUSTOMER_CART,
  UPDATE_CUSTOMER_CART,
} from '../../../assets/graphql';
import { ToastContainer, toast } from 'react-toastify';
import { saveUserData } from '../../../features/login/loginDataSlice';
import {
  savegetaddresslist,
  saveaddtoproductcart,
  saveShippingAddress,
} from '../../../features/HomePageSlice/homeDataSlice';

const Checkout_Left_Block = ({ setPaymentData }) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [shippingMethods, setShippingMethods] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [selectedShippingMethods, setSelectedShippingMethods] = useState({});
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState({});
  const [selectedBillingAddress, setSelectedBillingAddress] = useState({});
  const [step, setStep] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userData } = useSelector((state) => state.login);

  const { getaddresslist, addtoproductcart, cartPrices } = useSelector(
    (state) => state.home
  );

  const record = async (variables) => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: variables,
          query: UPDATE_CUSTOMER_ADDRESS,
        },
      });
      setLoader(false);
      if (result.data.status === 200) {
        getLoggedInUser();
        // User Data is updated sucessfullly
        toast.success('User Data is updated sucessfullly');
        setShowAddressModal(false);
        navigate('/dashboard');
        GetAddressList();

      } else {
        // Error in updating User Data
        toast.error(result.data.message);
      }
    } else {
      navigate('/login');
    }
  };
  const updateRecord = async (variables) => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: variables,
          query: CREATE_CUSTOMER_ADDRESS,
        },
      });
      setLoader(false);
      if (result.data.createCustomerAddress) {
        getLoggedInUser();
        // User Data is updated sucessfullly
        toast.success('User Data is added sucessfullly');
        setShowAddressModal(false);

        GetAddressList();

      } else {
        // Error in updating User Data
        toast.error(result.data.message);
      }
    } else {
      navigate('/login');
    }
  };
  const getLoggedInUser = async () => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      authToken: token,
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: {},
        query: CUSTOMERDATA,
      },
    });
    setLoader(false);
    if (result.data && result.data.customer) {
      dispatch(saveUserData(result.data.customer));
    } else {
      toast.error(result.data.customer.message);
    }
  };
  const GetAddressList = async () => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: {},
          query: GET_ADDRESS_LIST,
        },
      });
      setLoader(false);
      if (!result.data.error_code) {
        dispatch(savegetaddresslist(result.data.customer));
      }
    } else {
      navigate('/login');
    }
  };
  const getCustomerShippingMethod = async () => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: {},
          query: SHIPPING_METHOD,
        },
      });
      setLoader(false);
      if (!result.data.message) {
        setShippingMethods(result.data.customerCart);
        getAvailablePaymentMethod(result.data.customerCart.id);
      }
    } else {
      navigate('/login');
    }
  };
  const getAvailablePaymentMethod = async (id) => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: { cartId: id },
          query: AVAILABLE_PAYMENT_METHOD,
        },
      });
      setLoader(false);
      if (!result.data.message) {
        setPaymentMethods(result.data.cart);
        if (result.data.cart.available_payment_methods.length === 1) setSelectedPaymentMethods([result.data.cart.available_payment_methods[0]]);
        console.log([result.data.cart.available_payment_methods[0]]);
      }
    } else {
      navigate('/login');
    }
  };
  // const getSelectedPaymentMethod = async (id) => {
  //     if (token) {
  //         const result = await apiHandler({
  //             url: endpoint.GRAPHQL_URL,
  //             method: 'POST',
  //             authToken: token,
  //             data: {
  //                 "base_url": endpoint.API_BASE_URL,
  //                 "variables": {cartId:id},
  //                 "query": SELECTED_PAYMENT_METHOD
  //             },
  //         });

  //         if (!result.data.error_code) {
  //             dispatch(saveSelectedPaymentMethod(result.data));

  //         }
  //     }
  //     else {

  //     }
  // }
  // const grandTotalValue = () => {
  //   let totalPrice = 0;
  //   addtoproductcart &&
  //     addtoproductcart.forEach((cartitem) => {
  //       console.log(cartitem);
  //       if (
  //         cartitem &&
  //         cartitem.prices &&
  //         cartitem.prices.price &&
  //         cartitem.prices.price.value
  //       ) {
  //         totalPrice =
  //           totalPrice + cartitem.quantity * cartitem.prices.price.value;
  //       }
  //     });
  //   return addtoproductcart[0]
  //     ? totalPrice
  //     : '0.00';
  // }
  const getTotalAmount = () => {
    let totalPrice = cartPrices && cartPrices.grand_total && cartPrices.grand_total.value ? cartPrices.grand_total.value : 0;
    if (totalPrice > 0) return totalPrice;

    addtoproductcart &&
      addtoproductcart.forEach((cartitem) => {
        console.log(cartitem);
        if (
          cartitem &&
          cartitem.prices &&
          cartitem.prices.price &&
          cartitem.prices.price.value
        ) {
          totalPrice =
            totalPrice + cartitem.quantity * cartitem.prices.price.value;
        }
      });
      console.log('TOTAL - ', totalPrice);
    return addtoproductcart[0]
      ? totalPrice
      : '0.00';
  };
  const updatePaymentMethod = async () => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: {
            cartId: shippingMethods.id,
            code: selectedPaymentMethods[0].code,
          },
          query: SET_PAYMENT_METHOD,
        },
      });
      setLoader(false);
      console.log('REACH', addtoproductcart);
      setPaymentData({
        grand_total: getTotalAmount(),
        email: userData.email,
        c_firstname: userData.firstname,
        amount: getTotalAmount(),
        sku: addtoproductcart[0].product.sku,
        b_firstname: selectedBillingAddress.firstname,
        b_lastname: selectedBillingAddress.lastname,
        b_street_1: selectedBillingAddress.street[0],
        b_street_2: selectedBillingAddress.street[0],
        b_city: selectedBillingAddress.city,
        b_postcode: selectedBillingAddress.postcode,
        b_state: selectedBillingAddress.region.region ? selectedBillingAddress.region.region : "",
        b_country: selectedBillingAddress.country_code,
        b_phone: selectedBillingAddress.telephone,
        s_firstname: selectedShippingMethods.firstname,
        s_lastname: selectedShippingMethods.lastname,
        s_street_1: selectedShippingMethods.street[0],
        s_street_2: selectedShippingMethods.street[0],
        s_city: selectedShippingMethods.city,
        s_postcode: selectedShippingMethods.postcode,
        s_state: selectedShippingMethods.region.region ? selectedShippingMethods.region.region : "",
        s_country: selectedShippingMethods.country_code,
        s_phone: selectedShippingMethods.telephone,
      });
    } else {
      navigate('/login');
    }
  };
  const setShippingAddress = async () => {
    const shipingAddress = {
      cartId: shippingMethods.id,
      firstname: selectedShippingMethods.firstname,
      lastname: selectedShippingMethods.lastname,
      street: selectedShippingMethods.street,
      city: selectedShippingMethods.city,
      postcode: selectedShippingMethods.postcode,
      country_code: selectedShippingMethods.country_code,
      telephone: selectedShippingMethods.telephone,
    };
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: shipingAddress,
          query: SET_SHIPPING_ADDRESS,
        },
      });
      setLoader(false);
      setShippingMethodForPayment(result.data.setShippingAddressesOnCart.cart);
      dispatch(saveShippingAddress(shipingAddress));
      console.log(result.data);
    } else {
      navigate('/login');
    }
  };
  const setShippingMethodForPayment = async (shippingCart) => {
    let carrier_code =
      shippingMethods.shipping_addresses[0].available_shipping_methods[0]
        .carrier_code;
    let method_code =
      shippingMethods.shipping_addresses[0].available_shipping_methods[0]
        .method_code;

    if (shippingCart.shipping_addresses[0]) {
      carrier_code =
        shippingCart.shipping_addresses[0].available_shipping_methods[0]
          .carrier_code;
      method_code =
        shippingCart.shipping_addresses[0].available_shipping_methods[0]
          .method_code;
    }
    console.log(shippingMethods);
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: {
            cartId: shippingMethods.id,
            carrier_code: carrier_code,
            method_code: method_code,
          },
          query: SET_SHIPPING_METHOD,
        },
      });
      setLoader(false);
      console.log(result.data);
    } else {
      navigate('/login');
    }
  };
  const setBillingAddress = async () => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          variables: {
            cartId: shippingMethods.id,
            firstname: selectedBillingAddress.firstname,
            lastname: selectedBillingAddress.lastname,
            street: selectedBillingAddress.street,
            city: selectedBillingAddress.city,
            postcode: selectedBillingAddress.postcode,
            country_code: selectedBillingAddress.country_code,
            telephone: selectedBillingAddress.telephone,
          },
          query: SET_BILLING_ADDRESS,
        },
      });
      setLoader(false);
      console.log(result);
      if (paymentMethods &&
        paymentMethods.available_payment_methods && paymentMethods.available_payment_methods.length === 1)
        updatePaymentMethod();
    } else {
      navigate('/login');
    }
  };
  const handleShippingChange = (address) => {
    setSelectedShippingMethods(address);
  };
  const handleBillingChange = (address) => {
    setSelectedBillingAddress(address);
  };

  const handlePaymentChange = (payment) => {
    setSelectedPaymentMethods(payment);
  };

  useEffect(() => {
    GetAddressList();
    getCustomerShippingMethod();
  }, []);
  const addQuantity = (uid, Quantity) => {
    updateCartItems(uid, Quantity + 1);
  }

  const removeQuantity = (uid, Quantity) => {
    updateCartItems(uid, Quantity - 1);
  }

  const updateCartItems = async (uid, newQuantity) => {
    if (token) {
      setLoader(true);
      const result = await apiHandler({
        url: endpoint.GRAPHQL_URL,
        method: 'POST',
        authToken: token,
        data: {
          base_url: endpoint.API_BASE_URL,
          query: UPDATE_CUSTOMER_CART,
          variables: { cart_id: shippingMethods.id, cart_item_uid: uid, quantity: newQuantity },
        },
      });
      setLoader(false);
      if (!result.data.message) {
        getLatestCartInfo(shippingMethods.id);
      }
      else {
        // toast.error(result.data.message);
      }
    } else {
      navigate('/login');
    }
  };
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
        // toast.success('Added Successfully');
      }
      else {
        // toast.error(result.data.message);
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <div className="accordion" id="myCheckout">
        <div className="accordion-item">
          <h2 className="accordion-header" id="checkoutheadingOne">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#checkoutcollapseOne"

            >
              Shipping Information
            </button>
          </h2>
          <div
            id="checkoutcollapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#myCheckout"
          >
            <div className="card-body">
              <div className="saved_address">
                <ul>
                  {getaddresslist &&
                    getaddresslist.addresses &&
                    getaddresslist.addresses.map((address, index) => (
                      <li>
                        <div className="address_row_name">
                          <input
                            className="form-radio"
                            type="radio"
                            id="homeAddress"
                            onChange={() => handleShippingChange(address)}
                            name="addressType"
                            value={address}
                          />
                          <label for="homeAddress"></label>
                          <span className="name">
                            {' '}
                            {address.firstname} {address.lastname}
                          </span>{' '}
                        </div>
                        <div className="del_address">
                          {' '}
                          {address.street}, {address.city}- {address.postcode}
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="add_address_row" onClick={() => setShowAddressModal(true)}>
                  {' '}
                  <a
                    href=""
                    className="address_form_link"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    {' '}
                    <i className="fas fa-plus">
                      <FaPlus />
                    </i>{' '}
                    Add New Address
                  </a>{' '}
                </div>
              </div>
              <div className="text-center">
                <button

                  className="continuebutton hide "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#checkoutcollapseTwo"
                  onClick={() => setShippingAddress()}
                  disabled={selectedShippingMethods && selectedShippingMethods.firstname ? false : true}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="checkoutheadingTwo">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#checkoutcollapseTwo"
            >
              Billing Information
            </button>
          </h2>
          <div
            id="checkoutcollapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#myCheckout"
          >
            <div className="card-body">
              <div className="saved_address">
                <ul>
                  {getaddresslist &&
                    getaddresslist.addresses &&
                    getaddresslist.addresses.map((address, index) => (
                      <li>
                        <div className="address_row_name">
                          <input
                            className="form-radio"
                            type="radio"
                            id="homeAddress"
                            onChange={() => handleBillingChange(address)}
                            name="addressData"
                            value={address}
                          />
                          <label for="homeAddress"></label>
                          <span className="name">
                            {' '}
                            {address.firstname} {address.lastname}
                          </span>{' '}
                        </div>
                        <div className="del_address">
                          {' '}
                          {address.street}, {address.city}- {address.postcode}
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="add_address_row" onClick={() => setShowAddressModal(true)}>
                  {' '}
                  <a
                    href=""
                    className="address_form_link"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    {' '}
                    <i className="fas fa-plus">
                      <FaPlus />
                    </i>{' '}
                    Add New Address
                  </a>{' '}
                </div>
              </div>
              <div className="text-center">
                <button
                  className="continuebutton"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#checkoutcollapseFour"
                  onClick={() => setBillingAddress()}
                  disabled={selectedBillingAddress && selectedBillingAddress.firstname ? false : true}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="accordion-item">
                <h2 className="accordion-header" id="checkoutheadingTwo">
                    <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#checkoutcollapseTwo">Shipping Method</button>
                </h2>
                <div id="checkoutcollapseTwo" className="accordion-collapse collapse" data-bs-parent="#myCheckout">
                    <div className="card-body">
                     { getShippingMethod &&  getShippingMethod.map((shipping, index) =>
                        <p>{shipping.product.name}</p>
                    )} 
                        <div className="text-center"><button className="continuebutton" >Continue</button></div>
                    </div>
                </div>
            </div> */}
        {paymentMethods &&
          paymentMethods.available_payment_methods && paymentMethods.available_payment_methods.length > 1 && (
            <div className="accordion-item">
              <h2 className="accordion-header" id="checkoutheadingThree">
                <button
                  type="button"
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#checkoutcollapseThree"
                >
                  Payment Information
                </button>
              </h2>
              <div
                id="checkoutcollapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#myCheckout"
              >
                <div className="card-body">
                  {paymentMethods &&
                    paymentMethods.available_payment_methods &&
                    paymentMethods.available_payment_methods.map(
                      (payment, index) => (
                        <p key={index}>
                          {' '}
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked
                            onChange={() => handlePaymentChange(payment)}
                            value={payment}
                          />
                          {payment.title}
                        </p>
                      )
                    )}
                  {/* <p>
                <input type="checkbox" name="" /> Billing address same as
                shipping address
              </p> */}
                  <div className="text-center " id="checkoutheadingFour">
                    <button
                      className="continuebutton"
                      onClick={() => updatePaymentMethod()}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#checkoutcollapseFour"
                      disabled={selectedPaymentMethods && selectedPaymentMethods.code ? false : true}
                    >
                      Save AND Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        <div className="accordion-item">
          <h2 className="accordion-header" id="checkoutheadingFour">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#checkoutcollapseFour"
            >
              Order Review
            </button>
          </h2>
          <div
            id="checkoutcollapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#myCheckout"
          >
            <div className="card-body">
              {addtoproductcart &&
                addtoproductcart.map((cartitem, index) => (
                  <div className="row" style={{ marginBottom: '20px' }}>
                    <div className="col-lg-4 col-md-6">
                      <div className="accessoriesproductbox">
                        <div className="productImg">
                          <img
                            src={
                              cartitem.product.image &&
                                cartitem.product.image.url
                                ? cartitem.product.image.url
                                : ''
                            }
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8 col-md-6">
                      <div className="productDetails">
                        <a href={"/#/product-detail/" + cartitem.product.sku}>
                          <h5 >{cartitem.product.name}</h5>
                        </a>
                        <strong>
                          <b>
                            {' '}
                            MRP:{' '}
                            {getSampleCurrencyFormat(
                              'INR',
                              cartitem.prices &&
                                cartitem.prices.price &&
                                cartitem.prices.price.value
                                ? cartitem.prices.price.value
                                : 0
                            )}
                            /-{' '}
                          </b>
                        </strong>
                        <div className="cart_options">
                          <small className="d-block text-muted">
                            Quantity :{' '}
                            <button
                              style={{ border: 'none' }}
                              onClick={() => removeQuantity(cartitem.uid, cartitem.quantity)}
                            >
                              {' '}
                              -{' '}
                            </button>{' '}
                            {cartitem.quantity}{' '}
                            <button
                              style={{ border: 'none' }}
                              onClick={() => addQuantity(cartitem.uid, cartitem.quantity)}
                            >
                              {' '}
                              +{' '}
                            </button>
                          </small>
                          {/* <div className="cart_qty"> Qty:
                                                    <select name="qty" id="qty">
                                                        {
                                                            Array.from(Array(cartitem.quantity)).map((_, i) =>
                                                                <option value={i + 1}>{i + 1}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div> */}
                        </div>
                        {cartitem.configurable_options &&
                          cartitem.configurable_options.map((opt, i) => (
                            <small key={i} className="d-block text-muted">
                              {opt.option_label} : {opt.value_label}{' '}
                            </small>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <>
      {showAddressModal && (
        <AddressModal
          showModal={showAddressModal}
          updateRecord={updateRecord}
          record={record}
          closeModal={() => setShowAddressModal(false)}
        />
      )}
      </>
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

export default Checkout_Left_Block;
