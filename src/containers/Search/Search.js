import React, { useState, useEffect } from 'react';
import ProductListCard from "../../components/common/Product-Listing-Card/Product-Listing-Card";
import "../../assets/css/product-list.css";
import { useDispatch, useSelector } from 'react-redux';
import { getSampleCurrencyFormat, getUrlResolver } from "../../utils/utils";
import { saveProductlist } from '../../features/HomePageSlice/homeDataSlice';
import queryString from 'query-string';
import { endpoint } from "../../api/endpoint";
import { apiHandler } from "../../api";
import { PRODUCTLIST, CATEGORY_BREADCRUMBS, CATEGORY_INFO } from '../../assets/graphql';
import { useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { SEARCH } from "../../assets/graphql";



const Search = () => {
    const dispatch = useDispatch();
    const locations = useLocation();
    const values = queryString.parse(locations.search);
    console.log(locations);
    const [searchlist, setSearchList] = useState([]);
   
    const { token } = useSelector((state) => state.login);

    const search = async (obj) => {
        const result = await apiHandler({
          url: endpoint.GRAPHQL_URL,
          method: 'POST',
          authToken: token,
          data: {
            "base_url": endpoint.API_BASE_URL,
            "variables": { search: obj.q },
            "query": SEARCH
          },
        });
        setSearchList(result.data.products.items)
        // console.log(result.data.products.items);
    }
    useEffect(() => {
        search(values);
    }, [values]);

    return (
        <>
            {/* <!-- Breadcrumb END --> */}
            <section className="pt-5 pb-5 mt-5">
                <div className="container mt-5" >
                    <h4 className='main-heading-inner'>{"Search Result - " + values.q}</h4>
                    {searchlist.length > 0 ? (
                    <div className="row pt-4 gid-row-gap-style" >
                        {searchlist && searchlist.map((product, index) =>
                            <div className="col-md-4 col-lg-4" key={index}>
                                <ProductListCard
                                id={product.sku} 
                                ProductImg={product.image.url || ""} 
                                ProductName={product.name}
                                // ProductPrice={getSampleCurrencyFormat(product.price_range.minimum_price.regular_price.currency, product.price_range.minimum_price.regular_price.value)} 
                                />
                            </div>
                        )}
                    </div>
                    ) : (
                        <div className="row pt-4 mt-4 gid-row-gap-style" >
                            <center><h3>No Search Result </h3></center>
                        </div> 

                    )} 
                </div>
            </section>
        </>
    )
}
export default Search;