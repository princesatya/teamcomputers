import React, { useState, useEffect } from 'react';
import AccessoriesSectionCard from "../../components/common/Accessories-Section-Card/AccessoriesSectionCard";
import accessoriesproduct1 from "../../assets/img/accessoriesproduct1.png"
import "../../assets/css/product-details.css";
import ProductCarouselCard from "../../components/common/Product-Carousel-Card/Product-Carousel-Card";
import ProductDetailFilter from "../../components/common/Product-Detail-Filter/Product-Detail-Filter";
import { useSelector } from 'react-redux';
import { getSampleCurrencyFormat } from "../../utils/utils";
import { CATEGORY_BREADCRUMBS, PRODUCT_DETAILS, CATEGORY_PRODUCTS, CATEGORY_PRODUCTS_FILTER, RELATED_PRODUCT } from '../../assets/graphql';
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { apiHandler } from "../../api";
import { endpoint } from "../../api/endpoint";
import { useParams } from "react-router-dom";
import { saveproductDetails, savecategoryProduct, savegetrelatedproduct } from '../../features/HomePageSlice/homeDataSlice';
import { useDispatch } from "react-redux";
import RelatedProductCard from '../../components/common/RelatedProductCard/RelatedProductCard';

const ProductDetail = () => {
  const [breadcrumbData, setBreadcrumbData] = useState({});
  const [filter, setFilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selectedFilterUid, setSelectedFilterUid] = useState({});
  const [step, setStep] = useState(0);
  const [option, setOption] = useState([]);
  const [selectedOptionUid, setSelectedOptionUid] = useState({});
  const [loader, setLoader] = useState(false);

  const { id } = useParams();
  const { productDetails, getrelatedproduct } = useSelector(
    (state) => state.home
  );
  console.log(productDetails);
  const { token } = useSelector((state) => state.login);


  const dispatch = useDispatch();

  const getProductDetail = async (id) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      authToken: token,
      data: {
        "base_url": endpoint.API_BASE_URL,
        "variables": { sku: decodeURIComponent(id) },
        "query": PRODUCT_DETAILS
      },
    });
    setLoader(false);
    if (!result.data.error_code) {
      dispatch(saveproductDetails(result.data.products.items));
    }
  }

  const handleOptionChange = (option) => {
    console.log(option);
    setSelectedOptionUid({ ...selectedOptionUid, [option.uid]: { status: !selectedOptionUid[option.uid], price: option.price } })
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
    setSelectedFilterUid({ ...selectedFilterUid, [attribute_code]: filter.uid });
  };
  const selectedCategoryProduct = async (filter) => {
    // const result = await apiHandler({
    //   url: endpoint.GRAPHQL_URL,
    //   method: 'POST',
    //   data: {
    //     "base_url": endpoint.API_BASE_URL,
    //     "variables": { filter: { ...filter } },
    //     "query": CATEGORY_PRODUCTS_FILTER
    //   },
    // });
    // if (!result.data.error_code) {

    //   setFilter(result.data.products.aggregations);

    // }
  }

  const getRelatedProduct = async (id) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      data: {
        "base_url": endpoint.API_BASE_URL,
        "variables": { sku: id },
        "query": RELATED_PRODUCT
      },
    });
    setLoader(false);
    if (!result.data.error_code) {
      dispatch(savegetrelatedproduct(result.data.products.items));
    }
  }

  useEffect(() => {
    getProductDetail(id);
    getRelatedProduct(id);
  }, [id])
  useEffect(() => {

    if (productDetails && productDetails[0] && productDetails[0].id) {
      const { configurable_options } = productDetails[0];
      const filterOptions = configurable_options && configurable_options.map(conf => {
        const conf_options = conf.values.map(v => {
          return {
            label: v.label,
            uid: v.uid,
            value: v.swatch_data
          }
        });
        return {
          attribute_code: conf.attribute_code,
          position: conf.position,
          label: conf.label,
          options: conf_options
        };
      });

      setFilter(filterOptions);
    }
  }, [productDetails])


  const getBreadCrumbData = () => {
    let list = [];
    if (productDetails && productDetails[0]) {
      const { categories } = productDetails && productDetails[0];

      if (categories) {
        list.push({ name: 'Home', url: '/#/home' });
        categories && categories.forEach((cat) => {
          list.push({ name: cat.name, url: '/#/product-list/' + cat.url_key });
          console.log(cat.name);
        });
        list.push({ name: productDetails[0].name, url: '' });
        console.log( productDetails[0].name);
      }
    }
    return list;
  };

  return (
    <>
      <div className="product-custom-filter">
        <section className="custombreadcrumb">
          <Breadcrumb data={getBreadCrumbData()} />
        </section>
        <section className="pt-5 pb-5 leftsidebar">
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-5 col-xs-12 pt-3">
                <ProductDetailFilter filterData={filter} selectedFilter={selectedFilter} options={productDetails[0] && productDetails[0].options ? productDetails[0].options : null} handleFilterChange={handleFilterChange} handleOptionChange={handleOptionChange} />
              </div>

              <div className="col-lg-8 col-md-7 col-xs-12 price pt-3">
                <ProductCarouselCard ids={productDetails[0] && productDetails[0].id} filterData={filter} selectedFilterUid={selectedFilterUid} selectedOptionUid={selectedOptionUid} step={step} />

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
              {productDetails && productDetails[0] && productDetails[0].related_products && productDetails[0].related_products.map((item, index) =>
                <div className="col-md-4" key={index}>
                  <RelatedProductCard
                    // skuid={product.sku}
                    // PrductImg={product.image.url}
                    ProductDetail={item.name}
                  // filterData={filter} selectedFilterUid={selectedFilterUid} step={step}
                  // ProductPrice={getSampleCurrencyFormat(product.price_range.minimum_price && product.price_range.minimum_price.final_price && product.price_range.minimum_price.final_price.currency ? product.price_range.minimum_price.final_price.currency : "INR", product.price_range.minimum_price && product.price_range.minimum_price.final_price && product.price_range.minimum_price.final_price.value ? product.price_range.minimum_price.final_price.value : 0)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
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
export default ProductDetail;