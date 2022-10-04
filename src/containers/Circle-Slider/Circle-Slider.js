import React from "react";
import "../../assets/css/slider.css";
import Carousel from 'react-bootstrap/Carousel'
import circleslider3 from "../../assets/img/slider/circle-slider-2.jpg";
import CircleSliderCard from "../../components/common/Circle-Slider-Card/Circle-Slider-Card";
import "../../assets/css/custom.css";
import "./common.css";
import { useSelector } from 'react-redux';


const CircleSlider = () => {
    const { banners } = useSelector(
        (state) => state.home

    );

    return (
        <>
            <section className="mh-full-screen customslider bg-gray-100 carousel-indicator-d">
                <div className="owl-carousel owl-theme circle-slider circle no-arrow">
                    <Carousel>
                        {banners && banners.map((banner, index) =>
                            <Carousel.Item key={index} >
                                <CircleSliderCard ProductName={banner.title} ProductDescription={banner.sub_title} circlesliderImg={banner.image} Url_KnowMore={banner.url_banner} Url_BuyNow={banner.buy_now_url} BuyNow="Buy Now" KnowMore="Know More" />
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            </section>
        </>
    )
}
export default CircleSlider;