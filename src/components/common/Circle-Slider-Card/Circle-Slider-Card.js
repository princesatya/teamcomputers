import React from "react";
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import "../../../assets/css/homepageproduct.css";
import { STORE_CONFIG, BANNERS, CATEGORIES, ACCESSORIES, NEWLAUNCHES } from '../../../assets/graphql';
import { apiHandler } from '../../../api';
import { endpoint } from '../../../api/endpoint';
import { useNavigate } from "react-router-dom";

const CircleSliderCard = ({ ProductName, ProductDescription, circlesliderImg, KnowMore, BuyNow, Url_KnowMore, Url_BuyNow }) => {
    // const query = useQuery();
    const navigate = useNavigate();
    const Buyproduct = async () => {
        // const { loading, error, data } = client.query({query: BANNER});


        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": {},
                "query": NEWLAUNCHES
            },

        });

        if (result.data) {

        } else {
            navigate('/login');
        }
    }
    const redirectTo = (url) => {
        window.location.href = url;
        console.log(url)
    }

    return (
        <>
            {/* <section className="mh-full-screen customslider bg-gray-100">
                <div className="owl-carousel owl-theme circle-slider"> */}
            <div className="item">
                <div className="">
                    <div className="row d-flex align-items-center justify-content-center">
                        {/* <div className="col-md-6 col-lg-6 py-md-5 py-lg-7 overlay-content">
                            <h2>{ProductName}</h2>
                            <p className="lead mb-4">{ProductDescription}</p>
                            <p>
                                <a className="btn custombutton" href={Url_KnowMore} ><i className="fas fa-eye"><FaEye /></i> {KnowMore}</a>
                                <a className="btn custombutton d-none" href={Url_BuyNow} ><i className="fas fa-shopping-cart"><FaShoppingCart /></i> {BuyNow}</a>
                            </p>
                        </div> */}
                        <div className="col-md-12 col-lg-12" style={{cursor: 'pointer'}} onClick={() => redirectTo(Url_KnowMore)}>
                            <img src={circlesliderImg} className="w-100" />
                        </div>
                    </div>
                </div>
            </div>

            {/* </div>
            </section> */}


        </>
    )
}
export default CircleSliderCard;