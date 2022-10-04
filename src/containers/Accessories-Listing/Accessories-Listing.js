import React from "react";
import AccessoriesSectionCard from "../../components/common/Accessories-Section-Card/AccessoriesSectionCard";
import accessoriesproduct1 from "../../assets/img/accessoriesproduct1.png"
import accessoriesproductaddmore from "../../assets/img/accessoriesproductaddmore.png"
import airpodsaccessories from "../../assets/img/airpods-accessories.png"
import Carousel from 'react-bootstrap/Carousel'
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { getSampleCurrencyFormat } from "../../utils/utils";

const AccessoriesList = () => {
    const { accessories } = useSelector(
        (state) => state.home
    );

    return (
        <div className=" mobile-carousel-team-computer mt-5">
            <section className="productaddsection pb-5 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto text-center pt-5 pb-5">
                            <div className="mainsection-title">
                                <h2>Accessories</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Desktop View Accessories section --> */}
                <div className="container-fluid d-none d-lg-block d-md-block">
                    {/* <div className="row"> */}
                    {/* <div className="col-md-3 Text-decoration-adbanner-byAirpods">
                            <div className="addbanner ">
                                <h4><span> It’s magic,</span> Remastered.</h4>
                                <p>Spatial audio with dynamic head tracking in an all-new design.</p>

                                <a href="">Buy AirPods</a>

                                <img src={airpodsaccessories} className="img-fluid" alt="" />
                            </div>
                        </div> */}

                    {/* <div className="col-md-9"> */}
                    <div className="row">
                        {accessories && accessories.map((accessory, index) =>
                            <div className="col-md-3">
                                <AccessoriesSectionCard id={accessory.sku} PrductImg={accessory.image.url} ProductDetail={accessory.name} ProductPrice={getSampleCurrencyFormat(accessory.price_range.minimum_price.final_price.currency, accessory.price_range.minimum_price.final_price.value)} />
                            </div>
                        )}
                        {/* <div className="col-md-4">
                                    <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="IPHONE 11 128GB (PRODUCT)RED WRLS" ProductPrice={getSampleCurrencyFormat()} />
                                </div>
                                <div className="col-md-4">
                                    <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="IPHONE 11 128GB (PRODUCT)RED WRLS" ProductPrice={getSampleCurrencyFormat()} />
                                </div>
                                <div className="col-md-4">
                                    <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="IPHONE 11 128GB (PRODUCT)RED WRLS" ProductPrice={getSampleCurrencyFormat()} />
                                </div> */}

                        {/* <div className="col-md-4">
                                    <div className="accessoriesproductbox text-decoration-Browse-more">
                                        <img src={accessoriesproductaddmore} className="img-fluid" alt="" />
                                        <div className="addmore">
                                            <a href="">
                                                <i className="fas fa-plus"><FaPlus /></i>
                                                <span>Browse More</span>
                                            </a>
                                        </div>
                                    </div>
                                </div> */}
                    </div>
                </div>

                {/* </div> */}
                {/* </div> */}
                {/* <!-- Desktop View Accessories section END --> */}


                {/* <!-- Mobile View Accessories section --> */}
                <div className="owl-carousel owl-theme circle-slider d-lg-none d-md-none">
                    <Carousel>
                        {accessories && accessories.map((accessory, index) =>
                            <Carousel.Item key={index}>
                                <div className="item">
                                    <AccessoriesSectionCard PrductImg={accessory.image.url} ProductDetail={accessory.name} ProductPrice={getSampleCurrencyFormat(accessory.price_range.minimum_price.regular_price.currency, accessory.price_range.minimum_price.regular_price.value)} />

                                </div>
                            </Carousel.Item>
                        )}

                    </Carousel>
                </div>
                {/* <!-- Mobile View Accessories section END --> */}
            </section>
        </div>
    )
}
export default AccessoriesList;