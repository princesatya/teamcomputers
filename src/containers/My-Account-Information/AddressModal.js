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


const AddressModal = ({ showModal, closeModal, record, updateRecord }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.login);
    const { country } = useSelector(
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

    useEffect(() => {
        setFirstname(record && record.firstname ? record.firstname : "");
        setLastname(record && record.lastname ? record.lastname : "");
        setCountrycode("US");
        setStreet(record && record.street ? record.street : "");
        setTelephone(record && record.telephone ? record.telephone : "");
        setPostcode(record && record.postcode ? record.postcode : "");
        setCity(record && record.city ? record.city : "");
    }, [record]);
    const CreateCustomerData = () => {

        //Form Validation
        if (!firstnamevalidation())
            return  toast.error("Please Enter Valid FirstName!!");
        if (!lastnamevalidation())
            return  toast.error("Please Enter Valid Lastname!!");
        if (!mobileNumberValidation())
            return  toast.error("Please Enter Valid Mobile Number!!");
        if (!addressValidation())
            return  toast.error("Please Enter Valid Address!!");
        if (!pincodeValidation())
            return  toast.error("Please Enter Valid Pincode!!");
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

    const mobileNumberValidation = () => {
        if (typeof telephone !== "undefined") {
            let isValid = true;
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(telephone)) {
                isValid = false;
            } else if (telephone.length != 10) {
                isValid = false;
            }
            return isValid;
        } else return true;
    }
    const firstnamevalidation = () => {
        if(typeof firstname !== "undefined"){
            let isValid = true;
            var pattern = new RegExp(/^[A-Za-z\s]*$/);
            if(!pattern.test(firstname)){
                isValid = false;
            }else if(firstname.length>50){
                isValid = false;
            }
            return isValid;  
        }else return true;
    }
    const lastnamevalidation = () => {
        if(typeof lastname !== "undefined"){
            let isValid = true;
            var pattern = new RegExp(/^[A-Za-z\s]*$/);
            if(!pattern.test(lastname)){
                isValid = false;
            }else if(lastname.length>50){
                isValid = false;
            }
            return isValid;  
        }else return true;
    }
    const pincodeValidation = () => {
        if (typeof postcode !== "undefined") {
            let isValid = true;
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(postcode)) {
                isValid = false;
            }else if (postcode.length !== 6) {
                isValid = false;
            }
            return isValid;
        } else return true;
    }
    const addressValidation = () => {
        if (typeof street !== "undefined") {
            let isValid = true;
             if (street.length < 2) {
                isValid = false;
            }
            return isValid;
        } else return true;
    }
    
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
                                    <input type="text" name="name" id="name" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                    
                                </div>
                                <div className="form_row">
                                    <input type="text" name="name" id="name" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    
                                </div>
                                <div className="form_row">
                                    <input type="text" name="phone" id="phone" placeholder="Phone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                                    
                                </div>
                                <div className="form_row">
                                    <textarea name="address" id="" placeholder="Address" value={street} onChange={(e) => setStreet(e.target.value)}></textarea>
                                    
                                </div>
                                <div className="form_row">
                                    <input type="text" name="pincode" id="pincode" placeholder="Pincode" max-length="6" value={postcode} onChange={(e) => setPostcode(e.target.value)} onBlur={(e) => setPinCodeDetail(e.target.value)} />
                                    
                                </div>
                                <div className="form_row">
                                    <input type="text" name="city" id="city" placeholder="City" disabled value={city} onChange={(e) => setCity(e.target.value)} />
                                    
                                </div>

                                <div className="form_row">
                                    <input type="text" name="state" id="state" placeholder="state" disabled value={stateName} onChange={(e) => setStateName(e.target.value)} />
                                   
                                </div>
                                <div className="form_row load_more_row">
                                    <button className="btn default_button_checkout" data-bs-dismiss="modal" aria-label="Close" onClick={() => CreateCustomerData()}>{"Save Continue"}</button>
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