import React, { useEffect, useState } from 'react';
import "../../assets/css/dashboard.css";
import { apiHandler } from "../../api";
import { endpoint } from "../../api/endpoint";
import { GET_ADDRESS_LIST, CREATE_CUSTOMER_ADDRESS, CUSTOMERDATA, UPDATE_CUSTOMER_ADDRESS, REMOVE_ADDRESS } from '../../assets/graphql';
import { savegetaddresslist } from '../../features/HomePageSlice/homeDataSlice';
import { saveUserData } from '../../features/login/loginDataSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import AddressModal from '../../components/common/Checkout-Page/AddressModal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';


const AddressBook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);
    const { userData } = useSelector(
        (state) => state.login
    );

    const { getaddresslist } = useSelector(
        (state) => state.home
    );


    const [showAddressModal, setShowAddressModal] = useState(false);
    const [record, setRecord] = useState(null);

    const showModal = (address) => {
        setShowAddressModal(true);
        if (address) setRecord(address);
    }
    const closeAddressModal = () => {
        setShowAddressModal(false);
        setRecord(null);
    };
    const editRecord = async (variables) => {
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": variables,
                    "query": UPDATE_CUSTOMER_ADDRESS
                },
            });
            setShowAddressModal(false);
            setRecord(null);
            if (result.data.updateCustomerAddress) {

                getLoggedInUser();
                // User Data is updated sucessfullly
                toast.success('User Data is updated sucessfullly');
                GetAddressList();
                navigate('/dashboard');
            } else {
                // Error in updating User Data
                toast.error(result.data.message);
            }
        }
        else {
            navigate('/login');
        }
    }
    const updateRecord = async (variables) => {

        if (variables.id) editRecord(variables);
        else {
            if (token) {
                const result = await apiHandler({
                    url: endpoint.GRAPHQL_URL,
                    method: 'POST',
                    authToken: token,
                    data: {
                        "base_url": endpoint.API_BASE_URL,
                        "variables": variables,
                        "query": CREATE_CUSTOMER_ADDRESS
                    },
                });
                setShowAddressModal(false);
                setRecord(null);
                if (result.data.createCustomerAddress) {

                    getLoggedInUser();
                    // User Data is updated sucessfullly
                    toast.success('User Data is added sucessfullly');
                    GetAddressList();
                    navigate('/address-book');
                } else {
                    // Error in updating User Data
                    toast.error(result.data.message);
                }
            }
            else {
                navigate('/login');
            }
        }
    }
    const getLoggedInUser = async () => {
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": {},
                "query": CUSTOMERDATA
            },
        });
        if (result.data && result.data.customer) {
            dispatch(saveUserData(result.data.customer));
        } else {
            toast.error(result.data.customer.message)
        }
    };

    const GetAddressList = async () => {
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": GET_ADDRESS_LIST
                },
            });

            if (!result.data.message) {
                dispatch(savegetaddresslist(result.data.customer));

            }
        } else {
            navigate('/login');
        }
    }
    const RemoveAddress = async (id) => {
        if (token) {

            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        id: id,
                    },
                    "query": REMOVE_ADDRESS
                },
            });
            if (!result.data.status) {
                toast.success('Delete Successfull');
                GetAddressList();

            }
            else if (result.data.errors && result.data.errors[0] && result.data.errors[0].message && result.data.errors[0].message === "The cart isn't active.") {
                dispatch({ type: 'SIGNOUT' });
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }

    useEffect(() => {
        GetAddressList();
    }, [])
    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">Address Book</li>
                    </ul>
                </div>
            </section>


            <section className="cart_wrap checkoutpage">

                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>Address Book</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <div className="leftsidebar">
                                <div className="profileBox">
                                    <div className="userprofileImg">{userData.firstname && userData.firstname[0]}{" "}{userData.lastname && userData.lastname[0]}</div>
                                    <h1>{userData.firstname && userData.firstname}{" "}{userData.lastname && userData.lastname}</h1>
                                </div>
                                <div className="dashboardmenu">
                                    <ul>
                                        <li><a href="/#/dashboard"><img src="img/mydashboard.png" alt="" /> My Dashboard</a></li>
                                        <li><a href="/#/account-information"><img src="img/accountinformation.png" alt="" />Account Information</a></li>
                                        <li><a href="/#/order-listing"><img src="img/myorders.png" alt="" /> My Orders</a></li>
                                        <li className="active"><a href="/#/address-book"><img src="img/addressbook.png" alt="" /> Address Book</a></li>
                                        <li><a href="/#/my-wish-list"><img src="img/mywishlist.png" alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="rightsidebar">
                                <div className="userinfo">
                                    <strong>Saved Address</strong>
                                    <button className="addaddress" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => showModal(null)}>ADD NEW ADDRESS</button>
                                </div>
                                <div className="row">

                                    {getaddresslist && getaddresslist.addresses && getaddresslist.addresses.map((address, index) =>
                                        <div className="col-md-6" key={index}>
                                            <div className="addressBox">
                                                <h3>
                                                    {/* <input type="radio" value="abc" name="abc" /> */}
                                                    {address.firstname}{" "}{address.lastname}</h3>
                                                <p>{address.street}, {address.city}- {address.postcode}</p>
                                                <div style={{ display: "flex" }}>
                                                    <div onClick={() => showModal(address)} style={{ cursor: "pointer" }}>
                                                        <a data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</a>
                                                    </div>
                                                    <div onClick={() => RemoveAddress(address.id)} style={{ cursor: "pointer" }}>
                                                        <a style={{ cursor: "pointer" }}>Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    { /* <div className="col-md-6">
                                        <div className="addressBox">
                                            <h3><input type="radio" value="abc" name="abc" /> Arti Shah</h3>
                                            <p>14/25B, alfa, Greater Noida, UP</p>
                                            <a href="javascript:void(0)">Edit</a>
                                            <a href="javascript:void(0)">Remove</a>
                                        </div>
                                    </div>  */ }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showAddressModal &&
                    <AddressModal
                        showModal={showAddressModal}
                        updateRecord={updateRecord}
                        record={record}
                        closeModal={closeAddressModal} />}
            </section>
            {/* <Modal /> */}
            <ToastContainer/>
        </>
    )
}

export default AddressBook; 