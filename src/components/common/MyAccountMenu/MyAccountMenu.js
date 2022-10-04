import React from "react";

const MyAccountMenu = () => {
    <>
        <ul>
            <li><a href="/#/dashboard"><img src="img/mydashboard.png" alt="" />My Dashboard</a></li>
            <li><a href="/#/account-information"><img src="img/accountinformation.png" alt="" /> Account Information</a></li>
            <li class="active"><a href="/#/order-listing"><img src="img/myorders.png" alt="" /> My Orders</a></li>
            <li><a href="/#/address-book"><img src="img/addressbook.png" alt="" /> Address Book</a></li>
            <li><a href="/#/my-wish-list"><img src="img/mywishlist.png" alt="" /> My Wishlist</a></li>
        </ul>
    </>
}
export default MyAccountMenu;