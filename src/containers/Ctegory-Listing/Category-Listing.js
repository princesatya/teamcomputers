import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import "../../assets/css/product-list.css";
import { useSelector } from 'react-redux';
import { getUrlResolver } from "../../utils/utils";
import { savesubcategory, saveCatagory } from '../../features/HomePageSlice/homeDataSlice';
import { endpoint } from "../../api/endpoint";
import { apiHandler } from "../../api";
import { CATEGORIES, CATEGORY_INFO, SUB_CATEGORY, CATEGORY_BREADCRUMBS, CATEGORY_PRODUCTS, CATEGORY_PRODUCTS_FILTER } from '../../assets/graphql';
import { useParams } from "react-router-dom";
import CategoryListCard from "../../components/common/Category-List-Card/Category-List-Card";
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import ProductDetailFilter from '../../components/common/Product-Detail-Filter/Product-Detail-Filter';


const CategoryList = () => {
    const [breadcrumbData, setBreadcrumbData] = useState({});
    const dispatch = useDispatch();
    const { url_key } = useParams();

    const [filter, setFilter] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});
    const [step, setStep] = useState(0);
    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const { categories, categoryinfo, subcategory } = useSelector((state) => state.home);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await getUrlResolver(url_key);

            if (result.route) {
                let id = result.route.id;
                getCategoryInfo(id);
                CategoryInfo(id);
                SubCategoryInfo(id);
                getBreadcrumb(id);
                getCategoryProduct(id);
            }
        }
        fetchData();
    }, [url_key])


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
        await setSelectedCategory(result.data.category);
    }
    const CategoryInfo = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": CATEGORIES
            },
        });
        setLoader(false);
        if (!result.data.error_code) {
            dispatch(saveCatagory(result.data.categoryList));
        }
    }
    const SubCategoryInfo = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": SUB_CATEGORY
            },
        });
        setLoader(false);
        if (!result.data.error_code) {
            dispatch(savesubcategory(result.data.category.children));

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
    }

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

    const getCategoryProduct = async (id) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { id },
                "query": CATEGORY_PRODUCTS
            },
        });
        setLoader(false);
        if (!result.data.error_code) {

            setFilter(result.data.products.aggregations);

        }
    }
    const handleFilterChange = (attribute_code, filter, step) => {

        setStep(step);
        if (attribute_code === 'price') {
            let from = 0, to = 0;
            let index = filter.value.indexOf("_");
            from = filter.value.substr(0, index);
            to = filter.value.substr(index + 1, filter.value.length);

            let filterPrice = {
                from: from,
                to: to
            };
            setSelectedFilter({ ...selectedFilter, price: filterPrice });
            selectedCategoryProduct({ ...selectedFilter, price: filterPrice });
        }
        else if (attribute_code === 'category_id') {
            setSelectedFilter({ ...selectedFilter, category_id: { eq: filter.value } });
            selectedCategoryProduct({ ...selectedFilter, category_id: { eq: filter.value } });
        }
        else if (attribute_code === 'color') {
            setSelectedFilter({ ...selectedFilter, color: { eq: filter.value } });
            selectedCategoryProduct({ ...selectedFilter, color: { eq: filter.value } });
        }

        else if (attribute_code === 'size') {
            setSelectedFilter({ ...selectedFilter, size: { eq: filter.value } });
            selectedCategoryProduct({ ...selectedFilter, size: { eq: filter.value } });

        }
        else {
            setSelectedFilter({ ...selectedFilter, [attribute_code]: filter.value });
            selectedCategoryProduct({ ...selectedFilter, [attribute_code]: filter.value });
        }
    };
    const selectedCategoryProduct = async (filter) => {
        setLoader(true);
        const result = await apiHandler({
            url: endpoint.GRAPHQL_URL,
            method: 'POST',
            data: {
                "base_url": endpoint.API_BASE_URL,
                "variables": { filter: { ...filter } },
                "query": CATEGORY_PRODUCTS_FILTER
            },
        });
        setLoader(false);
        // if (!result.data.error_code) {

        //   setFilter(result.data.products.aggregations);

        // }
    }

    return (
        <>
            <section className="custombreadcrumb">
                <Breadcrumb data={getBreadCrumbData()} />
            </section>

            <section class="innertopbanner" style={{backgroundColor:"#fff"}}>
                <img src={selectedCategory?.image || null} className="img-fluid" style={{ width: "auto", height: "100%" }} />
            </section>
            <section className="pt-5 pb-5 leftsidebar">
                <div className="container">
                    <div className="row">

                        {/* <div className="col-lg-4 col-md-4 col-xs-12 pt-3">
                            <ProductDetailFilter filterData={filter} handleFilterChange={handleFilterChange} />
                        </div> */}
                        <div className="col-lg-12 col-md-8 col-xs-12 price pt-3">
                            <h4 >{selectedCategory?.name || ""}</h4>
                            <div className="row pt-4 gid-row-gap-style" >
                                {subcategory && subcategory.map((category, index) =>
                                    <div className="col-md-4 col-lg-4">
                                        <CategoryListCard
                                            url_key={category.url_key}
                                            url_path={category.url_path}
                                            ProductName={category.name}
                                            PrductImg={category.image} />
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

                    </div>
                </div>
            </section>
            {/* <!-- Breadcrumb END --> */}
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
export default CategoryList;
