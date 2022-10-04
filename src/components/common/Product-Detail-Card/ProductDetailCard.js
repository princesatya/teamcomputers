import React from "react";
// import "../../assets/css/product-list.css";

const ProductDetailCard = ({ ProductImg, ProductPrice }) => {
  return (
    <>

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

      {/* <!-- Mobile Filter --> */}
      <div className="customfilter d-md-none d-lg-none">
        <div className="accordion pt-2 pe-5" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header customMobile" id="headingZero">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseZero" aria-expanded="true" aria-controls="collapseZero"><h4 className="d-flex align-items-center"><img src="img/product-details/filter.png" className="pe-2" /> Filters</h4></button>
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
                        <li><img src="img/product-details/c-1.png" /></li>
                        <li><img src="img/product-details/c-2.png" /></li>
                        <li><img src="img/product-details/c-3.png" /></li>
                        <li><img src="img/product-details/c-4.png" /></li>
                        <li><img src="img/product-details/c-5.png" /></li>
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
    </>
  )
}
export default ProductDetailCard;