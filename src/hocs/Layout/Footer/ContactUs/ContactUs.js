import React from "react";
import aboutcontactbanner from "../../../../assets/img/aboutcontactbanner.jpg"
import "./ContactUs.css";
import { CONTACT_US } from "../../../../assets/graphql"
import { apiHandler } from "../../../../api";
import { endpoint } from "../../../../api/endpoint";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const ContactUs = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [numberofemp, setNumberofemp] = useState("");
    const [solution, setSolution] = useState("");
    const [message, setMessage] = useState("");

    // Form error hooks
    const [fullnameError, setfullnameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [phoneError, setphoneError] = useState(false);
    const [numberofempError, setnumberofempError] = useState(false);
    const [solutionError, setsolutionError] = useState(false);
    const [messageError, setmessageError] = useState(false);

    //accesing input filed
    let name = document.getElementById('name');
    let emailid = document.getElementById('emailid');
    let phoneno = document.getElementById('phoneno');
    let emp = document.getElementById('emp');
    let sol = document.getElementById('sol');
    let text = document.getElementById('text');
    // function for green flag
    const flagGreen = (element) => {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }
    // function for red flag 
    const flagRed = (element) => {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
    //full name validation
    const isName = () => {
        //clrError()
        let re = /^[a-z A-Z]{2,30}$/;
        if (fullname.trim().length === 0) {
            setfullnameError('Fullname field is required!')
            flagRed(name)
            return false;
        }
        else if (re.test(fullname.trim()) === false) {
            setfullnameError('Enter valid fullname!')
            flagRed(name)
            return false;
        }
        else {
            setfullnameError("")
            flagGreen(name)
            return true;
        }
    }
    // email validation
    const isEmail = () => {
        let reg = /^[a-z 0-9]{1,}@[a-z]{2,}[.]{1}[a-z]{2,5}$/;
        if (email.trim() === "") {
            setemailError('Email field is required!')
            flagRed(emailid)
            return false;
        }
        else if (reg.test(email.trim()) === false) {
            setemailError('Enter a valid email!')
            flagRed(emailid)
            return false;
        }
        else {
            setemailError("")
            flagGreen(emailid)
            return true;
        }
    }
    // phone validation
    const isPhone = () => {
        let re = /^[6-9]\d{9}$/;
        if (phone.trim() === "") {
            setphoneError('Phone number field is required!')
            flagRed(phoneno)
            return false;
        }
        else if (re.test(phone.trim()) === false) {
            setphoneError('Enter a valid phone number!')
            flagRed(phoneno)
            return false;
        }
        else {
            setphoneError('')
            flagGreen(phoneno)
            return true;
        }
    }
    // no of emp validation 
    const isNoOfemp = () => {
        if (numberofemp.trim() === "") {
            setnumberofempError('No of Employee field is required!')
            flagRed(emp)
            return false;
        }
        else if (numberofemp === "No. of employees *") {
            setnumberofempError('No of Employee field is required!')
            flagRed(emp)
            return false;
        }
        else {
            setnumberofempError()
            flagGreen(emp)
            return true;
        }
    }
    //  validation 
    const isSol = () => {
        if (solution.trim().length === 0) {
            setsolutionError('Solution field is required!')
            flagRed(sol)
            return false;
        }
        else if (solution === "Solutions *") {
            setsolutionError('Solutions  field is required!')
            flagRed(sol)
            return false;
        }
        else {
            setsolutionError()
            flagGreen(sol)
            return true;
        }
    }
    // no of emp validation 
    const isMessage = () => {
        if (message.trim().length === 0) {
            setmessageError('Message field is required!')
            flagRed(text)
            return false;
        }
        else {
            setmessageError('')
            flagGreen(text)
            return true;
        }
    }
    //form validation code
    //let validate = [isName, isEmail, isPhone, isNoOfemp, isSol, isMessage];
    const formValidation = () => {
        if (
            isName() &&
            isEmail() &&
            isPhone() &&
            isNoOfemp() &&
            isSol() &&
            isMessage()) {
            return true;
        }
        else {
            isName()
            isEmail()
            isPhone()
            isNoOfemp()
            isSol()
            isMessage()
        }
        return false;
    }
    const ContactUs = async() => {
        // isName()
        // isEmail()
        // isPhone()
        // isNoOfemp()
        // isSol()
        // isMessage()
        if (formValidation()===true) {
            const result = await apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {
                        fullname: fullname,
                        email: email,
                        phone: phone,
                        numberofemp: numberofemp,
                        solution: solution,
                        message: message
                    },
                    "query": CONTACT_US
                },
            });
            if (!result.data.message) {
                toast.success('Thanks For Contacting Us');
                setFullname("")
                setEmail("")
                setPhone("")
                setNumberofemp("")
                setSolution("")
                setMessage("")
            }
            else {
                toast.error(result.data.message);
            }
        }
    };
    return (
        <>
            <div className="search-area-wrapper">
                <div className="search-area d-flex align-items-center justify-content-center">
                    <div className="close-btn">
                        <i className="fas fa-times"></i>
                    </div>
                    <form className="search-area-form" action="#">
                        <div className="mb-4 position-relative">
                            <input className="search-area-input" type="search" name="search" id="search" placeholder="What are you looking for?" />
                            <button className="search-area-button" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="banner">
                <img src={aboutcontactbanner} alt="" />
                <div className="breadscrumb">Imagine. Design. Build & Operate.</div>
            </div>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <div className="contactBox">
                                <i className="fas fa-regular fa-street-view"></i>
                                <h3>Head Office</h3>
                                <p>No.1, Mohammadpur, Bhikaji Cama Place New Delhi – 110066 India</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="contactBox">
                                <i className="fas fa-regular fa-headset"></i>
                                <h3>Call Us</h3>
                                <p>1800 102 4200 <br /> 1800 11 4200</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="contactBox">
                                <i className="fas fa-solid fa-envelope"></i>
                                <h3>Email Us</h3>
                                <a href="mailto:customercare@teamcomputers.com">customercare@teamcomputers.com</a>
                                <a href="mailto:careers@teamcomputers.com">careers@teamcomputers.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center justify-content-center mt-5">
                        <div className="col-lg-6">
                            <iframe title="iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224263.66099856232!2d77.187185!3d28.566168!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x41ba390c2686dd89!2sTeam%20Computers%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1660652024059!5m2!1sen!2sin"
                                width="100%s"
                                height="550"
                            // style="border:0;" 
                            // allowfullscreen="" 
                            // loading="lazy" 
                            // referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="col-lg-6">
                            <div className="contactform">
                                <h2>Let's get in touch</h2>
                                <div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" required="" placeholder="Full Name*" data-form-field="Name" value={fullname} onChange={(e) => setFullname(e.target.value)} id="name" onBlur={() => isName()} />
                                        <span className="text-left text-small col-md-12 color_red">{fullnameError}</span>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" required="" placeholder="Email Address*" data-form-field="Email" value={email} onChange={(e) => setEmail(e.target.value)} id='emailid' onBlur={() => isEmail()} />
                                        <span className="text-left text-small col-md-12 color_red">{emailError}</span>
                                    </div>
                                    <div className="form-group">
                                        <input type="tel" className="form-control" name="phone" placeholder="Phone*" data-form-field="Phone Number*" value={phone} onChange={(e) => setPhone(e.target.value)} id='phoneno' onBlur={() => isPhone()} />
                                        <span className="text-left text-small col-md-12 color_red">{phoneError}</span>
                                    </div>

                                    <div className="form-group">
                                        <select className="form-control" value={numberofemp} onChange={(e) => setNumberofemp(e.target.value)} id='emp' onBlur={() => isNoOfemp()}>
                                            <option disabled="" hidden="" selected="">No. of employees *</option>
                                            <option value="0-100">0-100</option>
                                            <option value="100-500">100-500</option>
                                            <option value="500-1000">500-1000</option>
                                            <option value="1000-5000">1000-5000</option>
                                            <option value="5000+">5000+</option>
                                        </select>
                                        <span className="text-left text-small col-md-12 color_red">{numberofempError}</span>
                                    </div>

                                    <div className="form-group">
                                        <select className="form-control" value={solution} onChange={(e) => setSolution(e.target.value)} id='sol' onBlur={() => isSol()}>
                                            <option disabled="" hidden="" selected=""  >Solutions *</option>
                                            <option value="Infrastructure Solution">Infrastructure Solution</option>
                                            <option value="Cloud Solution">Cloud Solution</option>
                                            <option value="Digital Engineering">Digital Engineering</option>
                                            <option value="Business Apps">Business Apps</option>
                                            <option value="Digital Experience Solutions">Digital Experience Solutions</option>
                                            <option value="Infrastructure Managed Services">Infrastructure Managed Services</option>
                                            <option value="IT Financial Services">IT Financial Services</option>
                                        </select>
                                        <span className="text-left text-small col-md-12 color_red">{solutionError}</span>
                                    </div>

                                    <div className="form-group">
                                        <textarea className="form-control" name="message" placeholder="Message" rows="7" data-form-field="Message" value={message} onChange={(e) => setMessage(e.target.value)} id='text' onBlur={() => isMessage()}></textarea>
                                        <span className="text-left text-small col-md-12 color_red">{messageError}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => ContactUs()}>Submit</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6"></div>
                    </div>




                </div>
            </section>


            <ToastContainer />
        </>
    )
}
export default ContactUs;