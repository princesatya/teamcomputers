import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import NewLaunchesCard from "../../components/common/New-Launches-Card/NewLaunchesCard";
import promoiphone13 from "../../assets/img/desktopmac.png";
import { useSelector } from 'react-redux';
import { getSampleCurrencyFormat } from "../../utils/utils";

const NewLaunches = () => {
    const { newlaunches } = useSelector(
        (state) => state.home

    );
   
    return (
        <>
            <section className="pt-5 owl-Carousel-team-computer">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 mx-auto text-center mb-5">
                            <div className="mainsection-title">
                                <h2>New Launches</h2>
                            </div>
                        </div>
                    </div>
                    <div className="owl-carousel owl-theme circle-slider productimg no-arrow">
                        <Carousel>
                            {newlaunches && newlaunches.map((newlaunche, index) =>
                                <Carousel.Item key={index}>
                                    <NewLaunchesCard
                                        id={newlaunche.sku}
                                        ProductImg={newlaunche.image.url}
                                        ProductName={newlaunche.name}
                                        ProductPrice={getSampleCurrencyFormat(newlaunche.price_range.minimum_price.regular_price.currency, newlaunche.price_range.minimum_price.regular_price.value)}
                                        // ProductTitle={newlaunche.short_description.html}
                                    />
                                </Carousel.Item>
                            )}

                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    )
}
export default NewLaunches;