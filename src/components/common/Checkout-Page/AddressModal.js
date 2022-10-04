import React, { useEffect, useState } from 'react'
import "../../../assets/css/checkout.css";
import { apiHandler } from '../../../api';
import { endpoint } from '../../../api/endpoint';
import { GET_REGION_LIST, PIN_CODE } from '../../../assets/graphql';
import { useSelector } from 'react-redux';
import { saveUserData } from '../../../features/login/loginDataSlice';
import { saveGetRegion } from '../../../features/HomePageSlice/homeDataSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { validate } from 'graphql';


const AddressModal = ({ showModal, closeModal, record, updateRecord }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.login);
    const { country } = useSelector(
        (state) => state.home
    );
    const { getaddresslist } = useSelector(
        (state) => state.home
    );

    const [firstname, setFirstname] = useState(record && record.firstname ? record.firstname : "");
    const [lastname, setLastname] = useState(record && record.lastname ? record.lastname : "");
    // const [region, setRegion] = useState( record && record.region ? record.region: "");
    // const [regionCode, setRegioncode] = useState("");
    const [countryCode, setCountrycode] = useState("US");
    const [street, setStreet] = useState(record && record.street ? record.street : "");
    const [telephone, setTelephone] = useState(record && record.telephone ? record.telephone : "");
    // console.log(record);
    const [postcode, setPostcode] = useState(record && record.postcode ? record.postcode : "");
    const [city, setCity] = useState(record && record.city ? record.city : "");
    const [pinCode, setPinCode] = useState("");
    const [stateName, setStateName] = useState("");
    const [loader, setLoader] = useState(false);

    //error hooks
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [mobileNumberError, setMobileNumberError] = useState(false);
    const [pincodeError, setPincodeError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    //const [dupAddressError, setDupAddressError] = useState(false);

    useEffect(() => {
        setFirstname(record && record.firstname ? record.firstname : "");
        setLastname(record && record.lastname ? record.lastname : "");
        setCountrycode("US");
        setStreet(record && record.street ? record.street : "");
        setTelephone(record && record.telephone ? record.telephone : "");
        setPostcode(record && record.postcode ? record.postcode : "");
        setCity(record && record.city ? record.city : "");
    }, [record]);
    const pincodeEvent = (e) => {
        setPinCodeDetail(e.target.value)
        pincodeValidation()
    }
    //form validation from here
    const mobileNumberValidation = () => {
        let isValid = true;
        var pattern = new RegExp(/^[6-9]\d{9}$/);
        if (telephone.trim() === '') {
            setMobileNumberError('Field required!');
            isValid = false;
        }
        else if (!pattern.test(telephone)) {
            setMobileNumberError('Mobile Number should contain Numeric values only!');
            isValid = false;
        } else if (telephone.length !== 10) {
            setMobileNumberError('Mobile Number should contain have 10 digits only!');
            isValid = false;
        } else {
            setMobileNumberError('');
            return isValid;
        }
    }
    const firstnamevalidation = () => {
        var pattern = new RegExp(/^[A-Za-z\s]+$/);
        if (firstname.trim() === '') {
            setFirstNameError('First Name is mandatory!');
            return false;
        }
        else if (!pattern.test(firstname)) {
            setFirstNameError('First Name should contain Alphabetic Characters only!');
            return false;
        } else if (firstname.length >= 50) {
            setFirstNameError('First Name should contain 50 Characters only!');
            return false;
        } else {
            setFirstNameError('');
            return true;
        }
    }
    const lastnamevalidation = () => {
        var pattern = new RegExp(/^[A-Za-z\s]+$/);
        if (lastname.trim() === '') {
            setLastNameError('Last Name is mandatory!')
            return false;
        }
        else if (!pattern.test(lastname)) {
            setLastNameError('Last Name should contain Alphabetic Characters only!')
            return false;
        } else if (lastname.length >= 50) {
            setLastNameError('Last Name should contain 50 Characters only!')
            return false;
        } else {
            setLastNameError('');
            return true;
        }
    }
    const pincodeValidation = () => {
        let isValid = true;
        var pattern = new RegExp(/^[0-9]+$/);
        if (postcode.trim() === '') {
            setPincodeError('Pincode is mandatory !')
            isValid = false;
        }
        else if (!pattern.test(postcode)) {
            setPincodeError('PinCode Should contain number only!')
            isValid = false;
        } else if (postcode.length !== 6) {
            setPincodeError('PinCode Should have length 6!')
            isValid = false;
        } else {
            setPincodeError('')
            return true;
        }
    }
    const addressValidation = () => {
        if (street.trim() === '') {
            setAddressError('Address is mandatory')
            return false;
        }
        else if (
            getaddresslist.addresses.map((add, index) => {
                if (firstname == add.firstname && lastname == add.lastname && telephone == add.telephone && city == add.city && street == add.street[0]) {
                    return false;
                }
                return true;
            })===false) {
            setAddressError('Address is already exist!')
            return false;
        }
        else {
            setAddressError('')
            return true;
        }
    }

    // const dupAddressValidation = () => {
    //     var existAddFlag = true;
    //     getaddresslist.addresses.map((add, index) => {            
    //         if (firstname == add.firstname && lastname == add.lastname && telephone == add.telephone && city == add.city && street == add.street[0]) {
    //             setDupAddressError('Address already!')
    //             existAddFlag = false;
    //             return existAddFlag;
    //         }
    //     })
    //     setDupAddressError('')
    //    return existAddFlag        
    // }
    // validation function
    const validateForm = () => {
        //Form Validation
        if (
            firstnamevalidation() &&
            lastnamevalidation() &&
            mobileNumberValidation() &&
            pincodeValidation() &&
            addressValidation()
        ) {
            return true;
        }
        else {
            firstnamevalidation()
            lastnamevalidation()
            mobileNumberValidation()
            pincodeValidation()
            addressValidation()
        }
        return false;
    }
    const CreateCustomerData = () => {
        if (validateForm() === true) {
            //code to dismiss modal after click on save button
            //document.getElementById('saveBtn').setAttribute('data-bs-dismiss', 'modal')
            //end code to dismiss modal after click on save button
            if (record && record.id) {
                // EDIT
                updateRecord({
                    id: record.id,
                    country_code: countryCode,
                    street: street,
                    telephone: telephone,
                    postcode: postcode,
                    city: city,
                    firstname: firstname,
                    lastname: lastname
                });
            } else {
                // ADD
                updateRecord({
                    // region: region,
                    // region_code: regionCode,
                    country_code: countryCode,
                    street: street,
                    telephone: telephone,
                    postcode: postcode,
                    city: city,
                    firstname: firstname,
                    lastname: lastname
                });
            }
            // if (token) {
            //     const result = await apiHandler({
            //         url: endpoint.GRAPHQL_URL,
            //         method: 'POST',
            //         authToken: token,
            //         data: {
            //             "base_url": endpoint.API_BASE_URL,
            //             "variables": variables,
            //             "query": CREATE_CUSTOMER_ADDRESS
            //         },
            //     });
            //     if (!result.data.error_code) {
            //         getLoggedInUser();
            //         // User Data is updated sucessfullly
            //         toast.success('User Data is updated sucessfullly');
            //         navigate('/#/dashboard');
            //     } else {
            //         // Error in updating User Data
            //         toast.error("Error in updating User Data");
            //     }
            // }
            // else {

            // }
        }
        else {
            return false;
        }
    };
    const getRegionList = async () => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": {},
                "query": GET_REGION_LIST
            },
        });
        setLoader(false);
        if (!result.data.error_code) {
            dispatch(saveGetRegion(result.data.country
            ));
            console.log(result.data.country
            )
        } else {
            toast.error(result.data)
        }
    };
    const setPinCodeDetail = async (value) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            authToken: token,
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { pinCode: value },
                "query": PIN_CODE
            },
        });
        setLoader(false);
        console.log(result.data.pin_code);
        if (result.data && result.data.pin_code) {
            setCity(result.data.pin_code.city);
            setStateName(result.data.pin_code.state_name)
            console.log(result.data.pin_code.city)
        }
        // if (!result.data.error_code) {
        //     dispatch(savePincode(result));
        //     console.log(result)
        // } else {
        //     toast.error(result.data)
        // }
    };


    useEffect(() => {
        getRegionList();
    }, []);

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" showmodal={showModal} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Address</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                    </div>
                    <div className="modal-body">
                        <div className="new_address_fom">
                            <div className='form_style'>
                                <div className="form_row">
                                    <input type="text" name="name" id="name" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} onBlur={firstnamevalidation} autoFocus />
                                    <span className='badge bg-danger m-1 p-1 rounded-pill'>{firstNameError}</span>
                                </div>
                                <div className="form_row">
                                    <input type="text" name="name" id="name" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} onBlur={lastnamevalidation} />
                                    <span className='badge bg-danger m-1 p-1 rounded-pill'>{lastNameError}</span>
                                </div>
                                <div className="form_row">
                                    <input type="text" name="phone" id="phone" placeholder="Phone" value={telephone} onChange={(e) => setTelephone(e.target.value)} onBlur={mobileNumberValidation} />
                                    <span className='badge bg-danger m-1 p-1 rounded-pill'>{mobileNumberError}</span>
                                </div>
                                <div className="form_row">
                                    <textarea name="address" id="" placeholder="Address" value={street} onChange={(e) => setStreet(e.target.value)} onBlur={addressValidation}></textarea>
                                    <span className='badge bg-danger m-1 p-1 rounded-pill'>{addressError}</span>
                                </div>
                                <div className="form_row">
                                    <input type="text" name="pincode" id="pincode" placeholder="Pincode" max-length="6" value={postcode} onChange={(e) => setPostcode(e.target.value)} onBlur={pincodeEvent} />
                                    <span className='badge bg-danger m-1 p-1 rounded-pill'>{pincodeError}</span>
                                </div>
                                <div className="form_row">
                                    <input type="text" name="city" id="city" placeholder="City" disabled value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>

                                <div className="form_row">
                                    <input type="text" name="state" id="state" placeholder="state" disabled value={stateName} onChange={(e) => setStateName(e.target.value)} />
                                </div>
                                <div className="form_row load_more_row">
                                    <button className="btn default_button_checkout" aria-label="Close" onClick={() => CreateCustomerData()} id='saveBtn'>{"Save Continue"}</button>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button> */}
                                    <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn default_button_checkout close_address_box" onClick={() => closeModal()}> {"Cancel"}</button>
                                </div>
                            </div>
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
        </div>

    )
}

export default AddressModal;