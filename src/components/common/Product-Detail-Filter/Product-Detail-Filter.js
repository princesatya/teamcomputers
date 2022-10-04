import React, { useState } from "react";

import filter from "../../../assets/img/product-details/filter.png";
import "../../../assets/css/product-details.css";
import { getSampleCurrencyFormat } from "../../../utils/utils";

const ProductDetailFilter = ({ filterData, handleFilterChange, selectedFilter, options, handleOptionChange }) => {
    const [step, setStep] = useState(0);
    // const [sizeChecked, setSizeChecked] = useState();
   
    const FilterDatas = filterData;
    console.log(options);
    const handleChange = (e, attribute_code, opt) => {
        setStep(step + 1);
        handleFilterChange(attribute_code, opt, step);
    };
    const handleOption = (e, uid, dropDown) => {
        let price = 0;
        let uidP = ""
        dropDown && dropDown.forEach(element => {
            price = price + element.price;
            uidP = element.uid;
        });
        handleOptionChange({ uid: uidP, price });
    }
    const getColorCode = (attribute_code, opt) => {
        // console.log(opt.value);
        let bSelected = false;
        if (attribute_code === "color") {
            if (selectedFilter && selectedFilter["color"] && selectedFilter["color"]["eq"] && selectedFilter["color"]["eq"] === opt.value) bSelected = true;
        }
        const code = opt.value && opt.value.value ? opt.value.value : ""
        return attribute_code === "color" ? <div className={bSelected ? "colorcode active" : "colorcode"} style={{ backgroundColor: `${code}` }} ></div> : null
    };
    return (
        <>
            <div className="customfilter d-none d-md-block d-lg-block product-custom-filter">
                <h4 className="d-flex align-items-center"><img src={filter} className="pe-2" /> Filters</h4>
                <div className="accordion pt-2 pe-5" id="accordionExample">
                    {FilterDatas && FilterDatas.sort((a, b) => a.position - b.position).map((filters, index) => {
                        console.log('DATA - ', filters);
                        return <div className="accordion-item" key={index} >
                            <h2 className="accordion-header" id={"heading" + filters.attribute_code}>
                                <button className="accordion-button" disabled={index > step} type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + filters.attribute_code} aria-expanded="false" aria-controls="collapseOne">
                                    {filters.label}
                                </button>
                            </h2>
                            <div id={"collapseOne" + filters.attribute_code} className={index === step ? "accordion-collapse" : "accordion-collapse collapse"} aria-labelledby={"heading" + filters.attribute_code} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {/* <ul className="p-0 color">
                                    <li><img src={c1} /></li>
                                    <li><img src={c2} /></li>
                                    <li><img src={c3} /></li>
                                    <li><img src={c4} /></li>
                                    <li><img src={c5} /></li>
                                </ul> */}
                                    {filters.options && filters.options.map((opt, i) => (
                                        <div className={getColorCode(filters.attribute_code, opt) ? "address_row_name colorcodestyle" : "address_row_name"} >
                                            <input className="form-radio " type="radio"  id={opt.value} name={filters.attribute_code} onChange={(e) => handleChange(e, filters.attribute_code, opt)} />
                                            <label for={opt.value}></label>
                                            <span className="name"> {" "}{opt.label}</span>
                                            {getColorCode(filters.attribute_code, opt)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    )}

                </div>
                {options && options.map((product, index) =>
                    <div className="address_row_name filter_protect_detail" key={index}>
                        <input className="form-radio" type="checkbox" id={product.uid} name={product.title} onChange={(e) => handleOption(e, product.uid, product.dropDown)} />
                        <label id={product.uid} style={{ marginLeft: "6px" }}>{product.title}{" + "}{getSampleCurrencyFormat("INR", product.dropDown[0].price)}</label>
                        <span className="name"> {" "}</span>
                    </div>
                )}
            </div>

            {/* <!-- Mobile Filter --> */}
            <div className="customfilter d-md-none d-lg-none product-custom-filter">
                <div className="accordion pt-2 pe-5" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header customMobile" id="headingZero">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseZero" aria-expanded="true" aria-controls="collapseZero"><h4 className="d-flex align-items-center"><img src={filter} className="pe-2" /> Filters</h4></button>
                        </h2>
                        <div id="collapseZero" className="accordion-collapse collapse" aria-labelledby="headingZero" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {FilterDatas && FilterDatas.map((filters, index) =>
                                    <div className="accordion-item" key={index} >
                                        <h2 className="accordion-header" id={"heading" + filters.attribute_code}>
                                            <button className="accordion-button" disabled={index > step} type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + filters.attribute_code} aria-expanded="false" aria-controls="collapseOne">
                                                {filters.label}
                                            </button>
                                        </h2>
                                        <div id={"collapseOne" + filters.attribute_code} className={index === step ? "accordion-collapse" : "accordion-collapse collapse"} aria-labelledby={"heading" + filters.attribute_code} data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {/* <ul className="p-0 color">
                                    <li><img src={c1} /></li>
                                    <li><img src={c2} /></li>
                                    <li><img src={c3} /></li>
                                    <li><img src={c4} /></li>
                                    <li><img src={c5} /></li>
                                </ul> */}
                                                {filters.options && filters.options.map((opt, i) => (
                                                    <div className="address_row_name">
                                                        <input className="form-radio" type="radio" id={opt.value} name="addressType" onChange={(e) => handleChange(e, filters.attribute_code, opt)} />
                                                        <label for={opt.value}></label>
                                                        <span className="name"> {" "}{opt.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    {options && options.map((product, index) =>
                        <div className="address_row_name filter_protect_detail" key={index}>
                            <input className="form-radio" type="checkbox" id={product.uid} name={product.title} onChange={(e) => handleOption(e, product.uid, product.dropDown)} />
                            <label id={product.uid} style={{ marginLeft: "6px" }}>{product.title}{" + "}{getSampleCurrencyFormat("INR", product.dropDown[0].price)}</label>
                            <span className="name"> {" "}</span>

                        </div>
                    )}

                </div>
            </div>
            {/* <!-- Mobile Filter END --> */}



        </>
    )
}
export default ProductDetailFilter;