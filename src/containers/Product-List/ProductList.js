import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import ProductListCard from "../../components/common/Product-Listing-Card/Product-Listing-Card";
import "../../assets/css/product-list.css";
import { useSelector } from 'react-redux';
import { getSampleCurrencyFormat, getUrlResolver } from "../../utils/utils";
import { saveProductlist } from '../../features/HomePageSlice/homeDataSlice';
import { endpoint } from "../../api/endpoint";
import { apiHandler } from "../../api";
import { PRODUCTLIST, CATEGORY_BREADCRUMBS, CATEGORY_INFO } from '../../assets/graphql';
import { useParams, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";



const ProductList = () => {
    const [breadcrumbData, setBreadcrumbData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [categoryName, setCategoryName] = useState("");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { url_key } = useParams();
    const locations = useLocation();
    const {state} = locations;
 

    const { categoryinfo } = useSelector(
        (state) => state.home
    );

    const getCategoryInfo = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": CATEGORY_INFO
            },
        });
        setLoader(false);
        // if (!result.data.error_code) {
        // dispatch(savecatagoryinfo(result.data.category));
        await setSelectedCategory(result.data.category);

        // }
    }

    const { productlist } = useSelector(
        (state) => state.home

    );
   

    const getProductLists = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": PRODUCTLIST
            },
        });
        setLoader(false);
        if (!result.data.error_code) {
            dispatch(saveProductlist(result.data.products?.items));
        }
    }
    const getBreadcrumb = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": CATEGORY_BREADCRUMBS
            },
        });
        setLoader(false);
        await setBreadcrumbData(result.data);

        // if (!result.data.error_code) {
        //     dispatch(savecategoryBreadcrumbs(result.data));
        // }
    }
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await getUrlResolver(locations && locations.state && locations.state.url_path ? locations.state.url_path : url_key);
           
            if (result.route) {
                let id = result.route.id;
                getCategoryInfo(id);
                getProductLists(id);
                getBreadcrumb(id);
            }
        }
        fetchData();
    }, [locations])

    const getBreadCrumbData = () => {

        const { category } = breadcrumbData;

        let list = [];
        if (category) {
            list.push({ name: 'Home', url: '/#/home' });
            category && category.breadcrumbs && category.breadcrumbs.forEach((cat) => {
                list.push({ name: cat.category_name, url: '/#/product-list/' + cat.category_id });
            });
            list.push({ name: category.name, url: '' });
        }
        return list;
    };

    // const BannerImage=()=>{


    // }
    return (
        <>
            {/* <!-- Breadcrumb --> */}
            <section className="custombreadcrumb">
                <Breadcrumb data={getBreadCrumbData()} />
            </section>

            {/* {categoryinfo && categoryinfo.map((category, index) =>
                <section>
                    <img src={category.image} className="img-fluid" />
                </section>
            )} */}
            <section className='innertopbanner'>
                <img src={selectedCategory?.image || null} className="img-fluid" />
            </section>
            {/* <!-- Breadcrumb END --> */}
            <section className="pt-5 pb-5">
                <div className="container" >
                    <h4 className='main-heading-inner'>{selectedCategory?.name || ""}</h4>
                    <div className="row pt-4 gid-row-gap-style" >
                        {productlist && productlist.map((product, index) =>
                            <div className="col-md-4 col-lg-4" key={index}>
                                <ProductListCard
                                 id={product.sku} 
                                 ProductImg={product.image.url} 
                                 ProductName={product.name}
                                // ProductPrice={getSampleCurrencyFormat(product.price_range.minimum_price.regular_price.currency, product.price_range.minimum_price.regular_price.value)} 
                                />
                            </div>
                        )}
                        {/* <div className="col-md-4 col-lg-4">
                            <ProductListCard ProductImg={p1} ProductPrice="500" />
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <ProductListCard ProductImg={p2} ProductPrice="500" />
                        </div> */}
                    </div>

                </div>
            </section>
            {loader && (
                <div className='loading-overlay'>
                    <div className='bounce-loader'>
                        {/* <div className='bounce1'></div>
								<div className='bounce2'></div>
								<div className='bounce3'></div> */}
                        <div className="loader"></div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ProductList;