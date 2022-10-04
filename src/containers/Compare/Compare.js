import React from "react";
import { useSelector } from 'react-redux';
import "../../assets/css/compare.css";
const Compare =()=>{
  const {  createcomparelist } = useSelector((state) => state.home);
  console.log(createcomparelist);
 
    return(
        <>

    <section class="custombreadcrumb">
       <div class="container">
              <ul class="breadcrumb justify-content-start">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active"><a href="#">Compare</a></li>
              </ul>
       </div>
    </section>
    <section class="pt-5 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="currentproduct">
              <h2>Current Product</h2>
              <div class="row">
                  <div class="col-md-5">
                    <img src="img/MJQJ3LL_DEFAULT_FV1.png" class="img-fluid" alt=""/>
                  </div>
                  <div class="col-md-7">
                    <h3>Magic Keyboard for iPad Pro 11‑inch (3rd generation) and iPad Air (5th generation)</h3>
                  </div>
                  <div class="col-md-12 p-4">
                    <p>The Magic Keyboard is an amazing companion for iPad Pro 11‑inch and iPad Air. It features an incredible typing experience, a trackpad that opens up new ways to work with iPadOS, a USB‑C port for pass‑through charging, and front and back protection. The Magic Keyboard has a floating cantilever design, allowing you to attach iPad Pro and iPad Air magnetically and to smoothly adjust it to the perfect viewing angle for you.</p>
                    <div class="comparePrice">$279.00 <span>or</span>$23.25/mo.per month for 12 mo.monthsFootnote*</div>
                    <div class="comparefreeshipping"> Free Shipping</div>
                    <div class="comparecart">
                      <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                      <button class="btn custombutton"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                  </div>
                </div>
              </div>

              <hr/>

              <div class="item-specs">
                <h4>Appearance</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Color</span> <span>Stainless Steel</span> </li>
                  <li> <span class="btxt">Hinge Side</span> <span>Both</span> </li>
                  <li> <span class="btxt">Type</span> <span>Freestanding</span> </li>
                  <li> <span class="btxt">Style</span> <span>French Door</span> </li>
                  <li> <span class="btxt">Glass Door</span> <span>No</span> </li>
                  <li> <span class="btxt">4 Door</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Series</span> <span>Contemporary</span> </li>
                  <li> <span class="btxt">Handle Design</span> <span>Contemporary</span> </li>
                  <li> <span class="btxt">Handle Shape</span> <span>Flat</span> </li>
                  <li> <span class="btxt">Handle Type</span> <span>Bar</span> </li>
                  <li> <span class="btxt">Handle Color</span> <span>Stainless Steel</span> </li>
                </ul>
                <h4>Details</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Type of Shelves</span> <span>Glass</span> </li>
                  <li> <span class="btxt">Total Capacity</span> <span>16.8 cu. ft.</span> </li>
                  <li> <span class="btxt">Split Shelves</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Refrigerator Capacity</span> <span>10.6 cu. ft.</span> </li>
                  <li> <span class="btxt">Number of Shelves</span> <span>4</span> </li>
                  <li> <span class="btxt">Freezer Shelves</span> <span>None</span> </li>
                  <li> <span class="btxt">Freezer Capacity</span> <span>6.2 cu. ft.</span> </li>
                  <li> <span class="btxt">Counter-Depth</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Accepts Custom Panels</span> <span>No</span> </li>
                  <li> <span class="btxt">Number of Doors</span> <span>4</span> </li>
                  <li> <span class="btxt">Freezer</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Freezer Type</span> <span>Drawers</span> </li>
                  <li> <span class="btxt">Convertible Freezer/Refrigerator</span> <span>No</span> </li>
                </ul>
                <h4>Dimensions</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Exterior Width</span> <span>32"</span> </li>
                  <li> <span class="btxt">Depth</span> <span>27.0625"</span> </li>
                  <li> <span class="btxt">Depth without Handles</span> <span>27.0625"</span> </li>
                  <li> <span class="btxt">Height</span> <span>70.5"</span> </li>
                  <li> <span class="btxt">Height without Hinges</span> <span>69.875"</span> </li>
                  <li> <span class="btxt">Size</span> <span>Full Size</span> </li>
                  <li> <span class="btxt">Width</span> <span>31.125"</span> </li>
                </ul>
                <h4>Features</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Defrost Type</span> <span>Frost Free</span> </li>
                  <li> <span class="btxt">Door Alarm</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Door Lock</span> <span>No</span> </li>
                  <li> <span class="btxt">Ice Maker</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Sabbath Mode</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Spill Proof Shelves</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Water Dispenser</span> <span>External</span> </li>
                  <li> <span class="btxt">LED Lighting</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Crisper</span> <span>Yes</span> </li>
                  <li> <span class="btxt">Interior Color</span> <span>White</span> </li>
                  <li> <span class="btxt">ActiveSmart Foodcare</span> <span>Yes</span> </li>
                </ul>
                <h4>Certification</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">ADA Compliant</span> <span>No</span> </li>
                  <li> <span class="btxt">Energy Star</span> <span>Yes</span> </li>
                </ul>
                <h4>Electrical Specifications</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Volts</span> <span>120 Volts</span> </li>
                  <li> <span class="btxt">Amps</span> <span>15 Amps</span> </li>
                </ul>
                <h4>Technical Details</h4>
                <ul class="specs-table">
                  <li> <span class="btxt">Door Color</span> <span>Stainless Steel</span> </li>
                </ul>
              </div>


            </div>
          </div>

          <div class="col-md-6 col-lg-8">

            <div class="currentproduct">
              <h2>Recommended Product</h2>
              <div class="row">
                <div class="col-md-12 col-lg-6">
                    <div class="row">
                      <div class="col-md-5">
                        <img src="img/MJQJ3LL_DEFAULT_FV1.png" class="img-fluid" alt=""/>
                      </div>
                      <div class="col-md-7">
                        <h3>Magic Keyboard for iPad Pro 11‑inch (3rd generation) and iPad Air (5th generation)</h3>
                      </div>
                      <div class="col-md-12 p-4">
                          <p>The Magic Keyboard is an amazing companion for iPad Pro 11‑inch and iPad Air. It features an incredible typing experience, a trackpad that opens up new ways to work with iPadOS, a USB‑C port for pass‑through charging, and front and back protection. The Magic Keyboard has a floating cantilever design, allowing you to attach iPad Pro and iPad Air magnetically and to smoothly adjust it to the perfect viewing angle for you.</p>
                          <div class="comparePrice">$279.00 <span>or</span>$23.25/mo.per month for 12 mo.monthsFootnote*</div>
                          <div class="comparefreeshipping"> Free Shipping</div>
                          <div class="comparecart">
                            <select>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                            <button class="btn custombutton"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                      </div>
                    </div>

                    <hr/>

                    <div class="item-specs">
                      <h4>Appearance</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Color</span> <span>Stainless Steel</span> </li>
                        <li> <span class="btxt">Hinge Side</span> <span>Both</span> </li>
                        <li> <span class="btxt">Type</span> <span>Freestanding</span> </li>
                        <li> <span class="btxt">Style</span> <span>French Door</span> </li>
                        <li> <span class="btxt">Glass Door</span> <span>No</span> </li>
                        <li> <span class="btxt">4 Door</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Series</span> <span>Contemporary</span> </li>
                        <li> <span class="btxt">Handle Design</span> <span>Contemporary</span> </li>
                        <li> <span class="btxt">Handle Shape</span> <span>Flat</span> </li>
                        <li> <span class="btxt">Handle Type</span> <span>Bar</span> </li>
                        <li> <span class="btxt">Handle Color</span> <span>Stainless Steel</span> </li>
                      </ul>
                      <h4>Details</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Type of Shelves</span> <span>Glass</span> </li>
                        <li> <span class="btxt">Total Capacity</span> <span>16.8 cu. ft.</span> </li>
                        <li> <span class="btxt">Split Shelves</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Refrigerator Capacity</span> <span>10.6 cu. ft.</span> </li>
                        <li> <span class="btxt">Number of Shelves</span> <span>4</span> </li>
                        <li> <span class="btxt">Freezer Shelves</span> <span>None</span> </li>
                        <li> <span class="btxt">Freezer Capacity</span> <span>6.2 cu. ft.</span> </li>
                        <li> <span class="btxt">Counter-Depth</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Accepts Custom Panels</span> <span>No</span> </li>
                        <li> <span class="btxt">Number of Doors</span> <span>4</span> </li>
                        <li> <span class="btxt">Freezer</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Freezer Type</span> <span>Drawers</span> </li>
                        <li> <span class="btxt">Convertible Freezer/Refrigerator</span> <span>No</span> </li>
                      </ul>
                      <h4>Dimensions</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Exterior Width</span> <span>32"</span> </li>
                        <li> <span class="btxt">Depth</span> <span>27.0625"</span> </li>
                        <li> <span class="btxt">Depth without Handles</span> <span>27.0625"</span> </li>
                        <li> <span class="btxt">Height</span> <span>70.5"</span> </li>
                        <li> <span class="btxt">Height without Hinges</span> <span>69.875"</span> </li>
                        <li> <span class="btxt">Size</span> <span>Full Size</span> </li>
                        <li> <span class="btxt">Width</span> <span>31.125"</span> </li>
                      </ul>
                      <h4>Features</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Defrost Type</span> <span>Frost Free</span> </li>
                        <li> <span class="btxt">Door Alarm</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Door Lock</span> <span>No</span> </li>
                        <li> <span class="btxt">Ice Maker</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Sabbath Mode</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Spill Proof Shelves</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Water Dispenser</span> <span>External</span> </li>
                        <li> <span class="btxt">LED Lighting</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Crisper</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Interior Color</span> <span>White</span> </li>
                        <li> <span class="btxt">ActiveSmart Foodcare</span> <span>Yes</span> </li>
                      </ul>
                      <h4>Certification</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">ADA Compliant</span> <span>No</span> </li>
                        <li> <span class="btxt">Energy Star</span> <span>Yes</span> </li>
                      </ul>
                      <h3>Electrical Specifications</h3>
                      <ul class="specs-table">
                        <li> <span class="btxt">Volts</span> <span>120 Volts</span> </li>
                        <li> <span class="btxt">Amps</span> <span>15 Amps</span> </li>
                      </ul>
                      <h4>Technical Details</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Door Color</span> <span>Stainless Steel</span> </li>
                      </ul>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6">
                    <div class="row">
                      <div class="col-md-5">
                        <img src="img/MJQJ3LL_DEFAULT_FV1.png" class="img-fluid" alt=""/>
                      </div>
                      <div class="col-md-7">
                        <h3>Magic Keyboard for iPad Pro 11‑inch (3rd generation) and iPad Air (5th generation)</h3>
                      </div>
                      <div class="col-md-12 p-4">
                          <p>The Magic Keyboard is an amazing companion for iPad Pro 11‑inch and iPad Air. It features an incredible typing experience, a trackpad that opens up new ways to work with iPadOS, a USB‑C port for pass‑through charging, and front and back protection. The Magic Keyboard has a floating cantilever design, allowing you to attach iPad Pro and iPad Air magnetically and to smoothly adjust it to the perfect viewing angle for you.</p>
                          <div class="comparePrice">$279.00 <span>or</span>$23.25/mo.per month for 12 mo.monthsFootnote*</div>
                          <div class="comparefreeshipping"> Free Shipping</div>
                          <div class="comparecart">
                            <select>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                            <button class="btn custombutton"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                      </div>
                    </div>

                    <hr/>

                    <div class="item-specs">
                      <h4>Appearance</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Color</span> <span>Stainless Steel</span> </li>
                        <li> <span class="btxt">Hinge Side</span> <span>Both</span> </li>
                        <li> <span class="btxt">Type</span> <span>Freestanding</span> </li>
                        <li> <span class="btxt">Style</span> <span>French Door</span> </li>
                        <li> <span class="btxt">Glass Door</span> <span>No</span> </li>
                        <li> <span class="btxt">4 Door</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Series</span> <span>Contemporary</span> </li>
                        <li> <span class="btxt">Handle Design</span> <span>Contemporary</span> </li>
                        <li> <span class="btxt">Handle Shape</span> <span>Flat</span> </li>
                        <li> <span class="btxt">Handle Type</span> <span>Bar</span> </li>
                        <li> <span class="btxt">Handle Color</span> <span>Stainless Steel</span> </li>
                      </ul>
                      <h4>Details</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Type of Shelves</span> <span>Glass</span> </li>
                        <li> <span class="btxt">Total Capacity</span> <span>16.8 cu. ft.</span> </li>
                        <li> <span class="btxt">Split Shelves</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Refrigerator Capacity</span> <span>10.6 cu. ft.</span> </li>
                        <li> <span class="btxt">Number of Shelves</span> <span>4</span> </li>
                        <li> <span class="btxt">Freezer Shelves</span> <span>None</span> </li>
                        <li> <span class="btxt">Freezer Capacity</span> <span>6.2 cu. ft.</span> </li>
                        <li> <span class="btxt">Counter-Depth</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Accepts Custom Panels</span> <span>No</span> </li>
                        <li> <span class="btxt">Number of Doors</span> <span>4</span> </li>
                        <li> <span class="btxt">Freezer</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Freezer Type</span> <span>Drawers</span> </li>
                        <li> <span class="btxt">Convertible Freezer/Refrigerator</span> <span>No</span> </li>
                      </ul>
                      <h4>Dimensions</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Exterior Width</span> <span>32"</span> </li>
                        <li> <span class="btxt">Depth</span> <span>27.0625"</span> </li>
                        <li> <span class="btxt">Depth without Handles</span> <span>27.0625"</span> </li>
                        <li> <span class="btxt">Height</span> <span>70.5"</span> </li>
                        <li> <span class="btxt">Height without Hinges</span> <span>69.875"</span> </li>
                        <li> <span class="btxt">Size</span> <span>Full Size</span> </li>
                        <li> <span class="btxt">Width</span> <span>31.125"</span> </li>
                      </ul>
                      <h4>Features</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Defrost Type</span> <span>Frost Free</span> </li>
                        <li> <span class="btxt">Door Alarm</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Door Lock</span> <span>No</span> </li>
                        <li> <span class="btxt">Ice Maker</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Sabbath Mode</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Spill Proof Shelves</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Water Dispenser</span> <span>External</span> </li>
                        <li> <span class="btxt">LED Lighting</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Crisper</span> <span>Yes</span> </li>
                        <li> <span class="btxt">Interior Color</span> <span>White</span> </li>
                        <li> <span class="btxt">ActiveSmart Foodcare</span> <span>Yes</span> </li>
                      </ul>
                      <h4>Certification</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">ADA Compliant</span> <span>No</span> </li>
                        <li> <span class="btxt">Energy Star</span> <span>Yes</span> </li>
                      </ul>
                      <h3>Electrical Specifications</h3>
                      <ul class="specs-table">
                        <li> <span class="btxt">Volts</span> <span>120 Volts</span> </li>
                        <li> <span class="btxt">Amps</span> <span>15 Amps</span> </li>
                      </ul>
                      <h4>Technical Details</h4>
                      <ul class="specs-table">
                        <li> <span class="btxt">Door Color</span> <span>Stainless Steel</span> </li>
                      </ul>
                    </div>
                </div>

              </div>
            </div>



          </div>






        </div>
      </div>
    </section>
        </>
    )
}
export default Compare