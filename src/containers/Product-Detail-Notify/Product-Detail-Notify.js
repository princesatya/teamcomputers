import React from "react";
import AccessoriesSectionCard from "../../components/common/Accessories-Section-Card/AccessoriesSectionCard";
import accessoriesproduct1 from "../../assets/img/accessoriesproduct1.png"
import p1 from "../../assets/img/product-details/p1.jpg"
import p2 from "../../assets/img/product-details/p2.jpg"
import c1 from "../../assets/img/product-details/c-1.png"
import c2 from "../../assets/img/product-details/c-2.png"
import c3 from "../../assets/img/product-details/c-3.png"
import c4 from "../../assets/img/product-details/c-4.png";
import c5 from "../../assets/img/product-details/c-5.png";
import filter from "../../assets/img/product-details/filter.png";

import "../../assets/css/product-details.css";

const ProductDetailNotify = () => {
    return (
        <>
            <section className="custombreadcrumb">
                <div className="container">
                    <ul className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href="/#/home">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Apple Watch</a></li>
                        <li className="breadcrumb-item"><a href="#">Apple Watch Series 7</a></li>
                        <li className="breadcrumb-item active">Starlight Aluminum Case with Braided Solo Loop</li>
                    </ul>
                </div>
            </section>

            <section className="pt-5 pb-5 leftsidebar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-xs-12 pt-3">

                            <div className="customfilter d-none d-md-block d-lg-block">
                                <h4 className="d-flex align-items-center"><img src={filter} className="pe-2" /> Filters</h4>
                                <div className="accordion pt-2 pe-5" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Band Colors
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <ul className="p-0 color">
                                                    <li><img src={c1} /></li>
                                                    <li><img src={c2} /></li>
                                                    <li><img src={c3} /></li>
                                                    <li><img src={c4} /></li>
                                                    <li><img src={c5} /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Case Size
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Connectivity
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="customfilter d-md-none d-lg-none">

                                <div className="accordion pt-2 pe-5" id="accordionExample">

                                    <div className="accordion-item">
                                        <h2 className="accordion-header customMobile" id="headingZero">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseZero" aria-expanded="true" aria-controls="collapseZero"><h4 className="d-flex align-items-center"><img src={filter} className="pe-2" /> Filters</h4></button>
                                        </h2>
                                        <div id="collapseZero" className="accordion-collapse collapse" aria-labelledby="headingZero" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            Band Colors
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <ul className="p-0 color">
                                                                <li><img src={c1} /></li>
                                                                <li><img src={c2} /></li>
                                                                <li><img src={c3} /></li>
                                                                <li><img src={c4} /></li>
                                                                <li><img src={c5} /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            Case Size
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            Connectivity
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 price pt-3">
                            <h5>Apple Watch</h5>
                            <h3>Starlight Aluminum Case with Braided Solo Loop</h3>
                            <p><small>Offer Price</small> <span>₹1200/-</span></p>
                            {/* <!-- Carousel --> */}
                            <div id="demo" className="carousel slide" data-bs-ride="carousel">

                                {/* <!-- Indicators/dots --> */}
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                                </div>

                                {/* <!-- The slideshow/carousel --> */}
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={p1} alt="Los Angeles" className="d-block img-fluid" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={p2} alt="Chicago" className="d-block img-fluid" />
                                    </div>
                                </div>

                                {/* <!-- Left and right controls/icons --> */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </button>
                            </div>

                            <div className="d-flex align-items-center cartadd">
                                <button className=" btn-cus me-2"><i className="fas fa-heart pe-1"></i> ADD TO WISHLIST</button>
                            </div>

                            <p className="pt-2 fs-4"><small className="red">Sorry, Not in Stock</small> <span className="blue fs-4">Notify Me</span></p>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>

                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 mx-auto text-center mb-5">
                            <div className="mainsection-title">
                                <h2>Related Products</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div classNameName="col-md-4">
                            <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="Pride Edition Nike Sport Loop" ProductPrice="500" />
                        </div>
                        <div classNameName="col-md-4">
                            <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="Pride Edition Nike Sport Loop" ProductPrice="500" />
                        </div>
                        <div classNameName="col-md-4">
                            <AccessoriesSectionCard PrductImg={accessoriesproduct1} ProductDetail="Pride Edition Nike Sport Loop" ProductPrice="500" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default ProductDetailNotify;