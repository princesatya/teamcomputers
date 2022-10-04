import { apiHandler } from '.';
import axios from 'axios';
import {
    saveBanner,
    saveCatagory,
    saveAccessories,
    saveNewlaunches,
    saveaboutus,
    savestoreconfig,

} from '../features/HomePageSlice/homeDataSlice';
import { endpoint } from './endpoint';
import { STORE_CONFIG, BANNERS, CATEGORIES, ABOUTUS, HOMECATEGORY, CATEGORY_PRODUCTS } from '../assets/graphql';

export const getHomepageData = ({ dispatch }) => {
    
    return axios
        .all([
            apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": CATEGORIES
                },
            }),
            apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": ABOUTUS
                },
            }),
            apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": STORE_CONFIG
                },
            }),
            apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": HOMECATEGORY
                },
            }),         
            apiHandler({
                url: endpoint.GRAPHQL_URL,
                method: 'POST',
                data: {
                    "base_url": endpoint.API_BASE_URL,
                    "variables": {},
                    "query": CATEGORY_PRODUCTS
                },
            }),
    
        ])
        .then(
            axios.spread((categories, aboutus,  storeconfig, homeCategory ) => {
              

                if (!categories.data.error_code) {
                    dispatch(saveCatagory(categories.data.categoryList));
                }
                if (!aboutus.data.error_code) {
                    dispatch(saveaboutus(aboutus.data.cmsBlocks.items));
                }
                if (!storeconfig.data.error_code) {
                    dispatch(savestoreconfig(storeconfig.data.storeConfig));
                }
           
                // if (!categoryBreadcrumbs.data.error_code) {
                //     dispatch(saveaboutus(categoryBreadcrumbs.data.category));
                // }
            })
        );
};
