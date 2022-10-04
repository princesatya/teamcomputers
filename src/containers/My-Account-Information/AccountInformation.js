import React, { useState } from 'react'
import "../../assets/css/dashboard.css";
import { UPDATE_CUSTOMER, CUSTOMERDATA } from '../../assets/graphql';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { useSelector } from 'react-redux';
import { saveUserData } from '../../features/login/loginDataSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import MyAccountMenu from '../../components/common/MyAccountMenu/MyAccountMenu';
import mydashboard from "../../assets/img/account/mydashboard.png";
import accountinformation from "../../assets/img/account/accountinformation.png";
import myorders from "../../assets/img/account/myorders.png";
import addressbook from "../../assets/img/account/addressbook.png";
import mywishlist from "../../assets/img/account/mywishlist.png";


const AccountInformation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.login);

    const [firstName, setFirstName] = useState(userData.firstname && userData.firstname);
    const [lastName, setLastName] = useState(userData.lastname && userData.lastname);
    const [email, setEmail] = useState(userData.email && userData.email);
    const [mobileNumber, setMobileNumber] = useState(userData.mobile_number && userData.mobile_number);
    const [gender, setGender] = useState("");
    const [prefix, setPrefix] = useState("");
    const { token } = useSelector((state) => state.login);

    const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);


    const validate = () => {
		if (
			isValidFirstName() &&
			isValidLastName() &&
			isValidPhone()
		) {
			return true;
		} else {
			isValidFirstName();
			isValidLastName();
			isValidPhone();
		}
		return false;
	};


    const UpdateCustomerData = async () => {
        if(!validate()){
            return;
        }
        if (token) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                authToken: token,
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        firstname: firstName,
                        lastname: lastName,
                        // email:email,
                        mobile_number: mobileNumber
                    },
                    "query": UPDATE_CUSTOMER
                },
            });
            if (result.data.message) {
                // Error in updating User Data
                toast.error(result.data.message);
            } else if (result.data.errors && result.data.errors[0] && result.data.errors[0].message && result.data.errors[0].message === "The cart isn't active.") {
                dispatch({ type: 'SIGNOUT' });
                navigate('/login');
            } else {
                getLoggedInUser();
                // User Data is updated sucessfullly
                navigate('/dashboard');
            }
        }
        else {
            navigate('/login');
        }
    };

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
            toast.error(result.data.customer.message);
        }
    };

    const isValidPhone = () => {
		if (mobileNumber.trim() !== '') {
			var phoneCheck = /^[6-9]\d{9}$/;
			if (!phoneCheck.test(mobileNumber.trim())) {
				setPhoneError('Invalid Contact Details! ');
				return false;
			} else {
				setPhoneError('');
				return true;
			}
		} else if (mobileNumber.trim() === '') {
			setPhoneError('This is a Required Field! ');
			return false;
		} else {
			setPhoneError('');
			return true;
		}
	};

    const isValidFirstName = () => {
		if (firstName.trim() !== '') {
			var nameCheck = /^[A-Za-z\s]+$/;
			if (!nameCheck.test(firstName.trim())) {
				setFirstNameError(
					'First Name should contain Alphabetic Characters only!'
				);
				return false;
			} else {
				setFirstNameError('');
				return true;
			}
		} else if (firstName.trim() === '') {
			setFirstNameError('This is a Required Field! ');
			return false;
		} else {
			setFirstNameError('');
			return true;
		}
	};

    const isValidLastName = () => {
		if (lastName.trim() !== '') {
			var nameCheck = /^[A-Za-z\s]+$/;
			if (!nameCheck.test(lastName.trim())) {
				setLastNameError(
					'Last Name should contain Alphabetic Characters only!'
				);
				return false;
			} else {
				setLastNameError('');
				return true;
			}
		} else if (lastName.trim() === '') {
			setLastNameError('This is a Required Field! ');
			return false;
		} else {
			setLastNameError('');
			return true;
		}
	};


    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item active">Account Information</li>
                    </ul>
                </div>
            </section>
            <section className="cart_wrap checkoutpage">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-2 pb-4">
                            <div className="mainsection-title">
                                <h2>Account Information</h2>
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
                                        <li><a href="/#/dashboard"><img src={mydashboard} alt="" /> My Dashboard</a></li>
                                        <li className="active"><a href="/#/account-information"><img src={accountinformation} alt="" />Account Information</a></li>
                                        <li><a href="/#/order-listing"><img src={myorders} alt="" /> My Orders</a></li>
                                        <li><a href="/#/address-book"><img src={addressbook} alt="" /> Address Book</a></li>
                                        <li><a href="/#/my-wish-list"><img src={mywishlist} alt="" /> My Wishlist</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="rightsidebar">
                                <div className="userinfo">
                                    <strong>Personal Information</strong>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label for="text" className="form-label">First name</label>
                                                <input type="text" className="form-control" id="" placeholder="" name="" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={isValidFirstName} required />
                                                <div className='row'><div className='text-left text-small col-md-12 color_red'>{firstNameError}</div></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label for="text" className="form-label">Last name</label>
                                                <input type="text" className="form-control" id="" placeholder="" name="" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={isValidLastName} required />
                                                <div className='row'><div className='text-left text-small col-md-12 color_red'>{lastNameError}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="pwd" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="" name="email"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="text" className="form-label">Mobile NUMBER</label>
                                        <input type="text" className="form-control" id="mobilenumber" placeholder="" name="mobilenumber"
                                            value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} onBlur={isValidPhone}/>
                                        <div className='row'><div className='text-left text-small col-md-12 color_red'>{phoneError}</div></div>
                                    </div>
                                    <button type="submit" className="btn btn-primary"
                                        onClick={() => UpdateCustomerData()}
                                    >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AccountInformation; 