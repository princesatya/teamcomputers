import React, { useEffect,useState } from 'react';
import CircleSlider from '../../containers/Circle-Slider/Circle-Slider';
import NewLaunches from '../../containers/New-Launches/NewLaunches';
import CategoriesBox from '../../containers/Categories-Box/CategoriesBox';
import AccessoriesSection from '../../containers/Accessories-Section/AccessoriesSection';
import AboutUsSection from '../../containers/About-Us-Section/AboutUs';
import '../../assets/css/homepageproduct.css';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/slider.css';
import '../../assets/css/custom.css';

import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import {
  saveAccessories,
  saveNewlaunches,
  saveCatagory
} from '../../features/HomePageSlice/homeDataSlice';
import { ACCESSORIES, NEWLAUNCHES, HOMECATEGORY } from '../../assets/graphql';

const HomePage = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { storeconfig } = useSelector((state) => state.home);


  useEffect(() => {
    if (storeconfig.accessories_category_id)
      getAccessoriesData(storeconfig.accessories_category_id);
    if (storeconfig.new_launch_sku)
      getNewLaunchesData(storeconfig.new_launch_sku.split(","));
  }, [storeconfig]);
  const getAccessoriesData = async (id) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: { id },
        query: ACCESSORIES,
      },
    });
    setLoader(false);
    if (!result.data.error_code) {
      dispatch(saveAccessories(result.data.products.items));
    }
  };
  const getNewLaunchesData = async (newLaunchSku) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: { newLaunchSku },
        query: NEWLAUNCHES,
      },
    });
    setLoader(false);
    if (!result.data.error_code) {
      dispatch(saveNewlaunches(result.data.productDetail.items));
    }
  };
  const getHomeCategory = async (newLaunchSku) => {
    setLoader(true);
    const result = await apiHandler({
      url: endpoint.GRAPHQL_URL,
      method: 'POST',
      data: {
        base_url: endpoint.API_BASE_URL,
        variables: {},
        query: HOMECATEGORY,
      },
    });
    setLoader(false);
    if (!result.data.error_code) {
      dispatch(saveCatagory(result.data.category));
    }
  };
  return (
    <>
      <CircleSlider />
      <NewLaunches />
      <CategoriesBox />
      <AccessoriesSection />
      <AboutUsSection />
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
  );
};

export default HomePage;
