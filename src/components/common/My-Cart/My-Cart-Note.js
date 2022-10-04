import React from "react";
import "../../../assets/css/mycart.css";
// import "../../../assets/css/style.css";


const MyCartNote = () => {
    return (
        <>
            <div className="cart_note">
                <p style={{ color: "red" }}><strong>EMI available on credit card payment</strong></p>
                <p>Normally ships in 5-7 working days. </p>
           
                <p><b><i>No return/exchange </i></b>permissible</p>
                <p><b><i>No cancellation </i></b>permissible</p>

            </div>

        </>
    )
}
export default MyCartNote;