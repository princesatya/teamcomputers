import React from "react";
import { useSelector } from 'react-redux';

const AboutUsSection = () => {
  const { aboutus } = useSelector(
    (state) => state.home
  );

  return (
    <>
      <section className="aboutintro pb-5 pt-1">
        <div className="container">
          <div className="row">
            {aboutus && aboutus.map((about, index) =>
              <>
                <div className="col-xl-9 mx-auto text-center pt-5 pb-5">
                  <div className="mainsection-title">

                    <h2>{about.title}</h2>
                  </div>
                </div>
                <div className="textcontent" >
                  <p dangerouslySetInnerHTML={{ __html: about.content }}>

                  </p>


                  <a href="/#/about-us">Know More</a>
                </div>
              </>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
export default AboutUsSection;