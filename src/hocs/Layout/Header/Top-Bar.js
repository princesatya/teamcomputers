import React, { useState, useEffect, useRef } from 'react';
import "../../../assets/css/topbar.css";
import familysetup from "../../../assets/img/product/familysetup.jpg"
import teamlogo from "../../../assets/img/teamlogo.png"
import CardItem from "../../../components/common/Card-Item/Card-Item";
import { FaBalanceScale, FaEnvelope } from 'react-icons/fa';
import { FaPhoneVolume } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaShoppingBag, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveToken, saveUserData } from "../../../features/login/loginDataSlice";
import { getSampleCurrencyFormat } from '../../../utils/utils';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { SEARCH } from "../../../assets/graphql";
import { apiHandler } from '../../../api';
import { endpoint } from '../../../api/endpoint';
import SearchList from '../../../components/common/SearchList/SearchList';
import { toast } from 'react-toastify';

const Header = () => {
  const [leftMenuState, setLeftMenuState] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchList, setSearchList] = useState("");
  const leftAboutMenu = useRef();
  const rightContent = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addtoproductcart, categories, storeconfig } = useSelector(
    (state) => state.home
  );

  // console.log(addtoproductcart);
  const { token, userData } = useSelector(
    (state) => state.login
  );

  const logout = () => {
    dispatch({ type: 'SIGNOUT' });
  };
  const se = ()=>{
    let searchError = document.getElementById('seaechError');
    searchError.innerText = "thhh"
  }
  const searchResult = () => {
    const searchValue = document.getElementById('search');
    if (searchValue.value.length < 3) {
      toast.error('Enter valid input to search');
    }
    else {
      setShowSearch(false);
      navigate('/search?q=' + searchParam);
    }
  };

  useEffect(() => {
    // getHTMLData();
    const handleScroll = () => {
      const position = window.pageYOffset;

      if (position > 36) {
        setLeftMenuState('fixed-top');
      } else {
        setLeftMenuState('navbar');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const getTotalAmount = () => {
    let totalPrice = 0;
    addtoproductcart && addtoproductcart.forEach(cartitem => {
      if (cartitem && cartitem.prices && cartitem.prices.price && cartitem.prices.price.value) {
        totalPrice = totalPrice + (cartitem.quantity * cartitem.prices.price.value);
      }
    });
    return addtoproductcart[0] ? getSampleCurrencyFormat("INR", totalPrice) : "0.00";
  };
  const getTotalCartItem = () => {
    let count = 0;
    addtoproductcart && addtoproductcart.forEach((cartitem, index) => {
      count = count + cartitem.quantity;
    });
    return count;
  }
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      searchResult();
    }
  };
  return (
    <>
      <header className="header header-absolute ">
        {/* <!-- Top Bar--> */}
        <div className="top-bar">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-sm-7 d-none d-lg-block">
                <ul className="list-inline topbar-text mb-0">
                  <li className="list-inline-item pe-3 me-0 ">
                    <i className="fa fa-envelope"><FaEnvelope /> {" "}</i>

                    <a className="parent-header-link-style" href="mailto:customercare@teamcomputers.com">
                      {storeconfig.support_email}

                    </a>
                  </li>

                  <li className="list-inline-item px-3 border-start d-none d-lg-inline-block">
                    <i className="fa fa-phone-volume"> <FaPhoneVolume /></i>

                    {storeconfig.support_phone}
                  </li>
                  {/* )} */}

                </ul>
              </div>
              <div className="col-sm-5 d-none d-lg-block d-flex justify-content-end userlogin">
                {token && token !== "" ? (
                  <>

                    <div className="dropdown">
                      <div>
                        <a href="" style={{ marginRight: "10px" }}>Hi,
                          {/* {userData.email && userData.email.split("@")[0]} */}
                          {userData.firstname && userData.firstname}

                          <span className='dropdownicon'><AiOutlineCaretDown /></span>
                        </a>
                      </div>
                      <div className="dropdown-content" id="navbarCollapse">
                        <a href="/#/dashboard"> My Account</a>
                        <a href="/#/account-information"> Edit Profile</a>
                        <a href="/#/order-listing"> Order</a>
                      </div>
                    </div>
                    <a href="" onClick={() => logout()}>Logout</a>
                  </>
                ) : (
                  <a href="/#/login"> <i className="fa fa-user"><FaUser /> </i> Login</a>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Top Bar End--> */}
        {/* <!-- Navbar--> */}
        <nav
          ref={leftAboutMenu}
          className={
            leftMenuState === 'fixed-top'
              ? 'navbar navbar-expand-lg navbar-sticky navbar-airy navbar-dark bg-fixed-white navbar-hover-light navbar-fixed-light fixed-top'
              : 'navbar navbar-expand-lg navbar-sticky navbar-airy navbar-dark bg-fixed-white navbar-hover-light navbar-fixed-light '
          }>
          <div className="container">
            {/* <!-- Navbar Header  --> */}
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <FaBars />
            </button>
            <a className="navbar-brand" href="/#/home"> <img src={teamlogo} alt="Team Computers Logo" /></a>


            {/* <!-- Navbar Collapse --> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mx-auto">
                {categories && categories.map((category, index) =>
                  <li key={index} className="nav-item"><a className="nav-link" href={category.name == "Watch" ? "/#/category-list/" + category.url_key : "/#/product-list/" + category.url_key}>{category.name}</a></li>
                )}

                <li className="nav-item d-lg-none">
                  {token && token !== "" ? (
                    <>

                      <div className="dropdown" style={{ width: "100%" }}>
                        <div>
                          <a className="nav-link" >Hi,
                            {/* {userData.email && userData.email.split("@")[0]} */}
                            {userData.firstname && userData.firstname}
                            <span className='dropdownicon'><AiOutlineCaretDown /></span>
                          </a>
                        </div>
                        <div className="dropdown-content" id="navbarCollapse">
                          <a href="/#/dashboard"> My Account</a>
                          <a href="/#/account-information"> Edit Profile</a>
                          <a href=""> Order</a>
                        </div>
                      </div>
                      <a href="" className="nav-link" onClick={() => logout()}><i className="fa fa-user"><FaSignOutAlt /> </i> &nbsp;Logout</a>
                    </>
                  ) : (
                    <a href="/#/login" className="nav-link"> <i className="fa fa-user"><FaUser /> </i> &nbsp; Login</a>
                  )}
                  {/* <a className="nav-link" href="/#/login"><i className="fa fa-user">
                    </i> &nbsp; Login</a> */}
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0">
              {/* <!-- Search Button--> */}
              {/* {showSearch &&
                <>
                  <div>  <input type="text" placeholder="Search.." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} /></div>

                </>
              } */}

              <div className="dropdown" style={{ width: "100%" }}>
                {/* {showSearch &&
                <>
                  <div>  <input type="text" placeholder="Search.." value={searchItem} onChange={(e) => setSearchItem(e.target.value)} /></div>

                </>
              } */}
                {/* <div className="dropdown-content" >
                  {searchList && searchList.items && searchList.items.map((list, index) =>
                    <div>
                        <SearchList
                          id={list.sku}
                          ProductName={list.name} />
                    </div>
                  )}
                </div> */}
              </div>
              <div className="nav-item"><a className="navbar-icon-link" href='/#/compare/'><FaBalanceScale style={{ fontSize: "1.5rem" }} /></a></div>
              <div className="nav-item navbar-icon-link" data-bs-toggle="search" onClick={() => setShowSearch(true)}>
                <FaSearch />
              </div>




              {/* <!-- User Not Logged - link to login page--> */}
              <div className="nav-item"><a className="navbar-icon-link" href="/#/wish-list">
                <FaHeart /></a>
              </div>
              {/* <!-- Cart Dropdown--> */}
              <div className="nav-item dropdown display-none-bag"><a className="navbar-icon-link d-lg-none" href="/#/my-cart">

                <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-lg-none">View cart</span></a>

                <div><a className="navbar-icon-link" id="cartdetails" href="" data-bs-target="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <FaShoppingBag />
                  <div className="navbar-icon-link-badge">{getTotalCartItem()} </div>
                </a>


                  <div className="dropdown-menu dropdown-menu-animated dropdown-menu-end p-4" aria-labelledby="">
                    <div className="navbar-cart-product-wrapper">
                      {/* <!-- cart item--> */}
                      {addtoproductcart && addtoproductcart.map((cartitem, index) =>
                        <CardItem key={index} ids={cartitem.id} airPods={cartitem.product.image && cartitem.product.image.url ? cartitem.product.image.url : ""}
                          AirPodsTitle={cartitem.product.name}
                          uid={cartitem.uid}
                          Quantity={cartitem.quantity}
                          configurable_options={cartitem.configurable_options}
                          Payment={getSampleCurrencyFormat("INR", cartitem.prices && cartitem.prices.price && cartitem.prices.price.value ? cartitem.prices.price.value : 0)} />
                      )}
                      {/* <CardItem airPods={familysetup} AirPodsTitle="Family Setup Apple Watch" Quantity="1" Payment="75.00" />
                      <CardItem airPods={familysetup} AirPodsTitle="Family Setup Apple Watch" Quantity="1" Payment="75.00" /> */}
                    </div>
                    {/* <!-- total price--> */}

                    <div className="navbar-cart-total">
                      <span className="text-uppercase text-muted">Total</span>
                      <strong className="text-uppercase">{getTotalAmount()}</strong>
                    </div>
                    {/* <!-- buttons--> */}
                    <div className="d-flex justify-content-between">
                      <a className="btn btn-link text-dark me-3" href="/#/my-cart">View Cart</a>
                      <a className="btn btn-outline-dark" href="/#/checkout">Checkout</a></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </nav>
        {/* <!-- /Navbar --> */}

        {/* <!-- Fullscreen search area--> */}
        {showSearch && (
          <div>
            <div className="search-area d-flex align-items-center justify-content-center">
              <div className="close-btn" onClick={() => setShowSearch(false)} >
                <FaTimes />
              </div>
              <div className="search-area-form">
                <div className="mb-4 position-relative">
                  <input className="search-area-input" onKeyDown={(e) => handleKeypress(e)} value={searchParam} onChange={(e) => setSearchParam(e.target.value)} name="search" id="search" placeholder="What are you looking for?" />
                  <button className="search-area-button" onClick={() => searchResult()}>
                    <FaSearch />
                  </button>
                </div>
                <span className='text-danger' id='searchError'></span>
              </div>
            </div>
          </div>
        )}
        {/* <!-- /Fullscreen search area--> */}
      </header>
    </>
  )
}
export default Header;