
import React, { useEffect } from 'react';
import { Route, BrowserRouter, HashRouter, Routes } from 'react-router-dom';
import Layout from './hocs/Layout/index';
import HomePage from './containers/Home-Page/HomePage';
import ProductDetail from './containers/Product-Detail/ProductDetail';
import ProductDetailNotify from './containers/Product-Detail-Notify/Product-Detail-Notify';
import ProductList from './containers/Product-List/ProductList';
import Login from "./containers/Login/Login"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { useDispatch } from 'react-redux';
import { getHomepageData } from './api/HomePage';
import MyCartBlock from './containers/My-Cart-Block/My-Cart-block';
import WishlistSection from './containers/Wishlist-Section/Wishlist-Section';
import CategoryList from './containers/Ctegory-Listing/Category-Listing';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccessoriesList from "./containers/Accessories-Listing/Accessories-Listing"
import Checkout from "./containers/Checkout/Checkout";
import Dashboard from "./containers/My-Account-Information/Dashboard";
import AccountInformation from "./containers/My-Account-Information/AccountInformation";
import AddressBook from "./containers/My-Account-Information/AddressBook";
import MyWishlist from "./containers/My-Account-Information/MyWishlist";
import ProtectedRoutes from "./hocs/ProtectedRoute/ProtectedRoute";
import OrderListing from "./containers/My-Account-Information/OrderListing";
import MyOrder from "./containers/My-Account-Information/MyOrder";
import ContentPage from "./containers/Content-Page/ContentPage";
import AboutUs from "./hocs/Layout/Footer/About-Us-Page/aboutUsPage";
import Blog from "./hocs/Layout/Footer/BlogsPage/BlogsPage";
import Compare from "./containers/Compare/Compare";
import Checkoutform from "./containers/Checkout/CheckoutForm";
import BlogDetail from "./hocs/Layout/Footer/BlogDetailPage/blogDetail";
import ContactUs from "./hocs/Layout/Footer/ContactUs/ContactUs";
import ScrollToTop from "./hocs/Layout/ScrollToTop";
import Search from "./containers/Search/Search";
import FAQs from './hocs/Layout/Footer/Faq/Faqs'

toast.configure({
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
});
export const client = new ApolloClient({
  uri: 'http://13.68.224.224/pub/graphql/',
  cache: new InMemoryCache(),
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getHomepageData({ dispatch }).then((result) => {
    })
  }, [])
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/product-detail/:id" element={<ProductDetail />} />
              <Route exact path="/product-detail-notify" element={<ProductDetailNotify />} />
              <Route exact path="/product-list/:url_key" element={<ProductList />} />
              <Route exact path="/my-cart" element={<MyCartBlock />} />
              <Route exact path="/wish-list" element={<WishlistSection />} />
              <Route exact path="/category-list/:url_key" element={<CategoryList />} />
              <Route exact path="/accessories-list" element={<AccessoriesList />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route exact path="/check-out-form" element={<Checkoutform />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/account-information" element={<AccountInformation />} />
              <Route exact path="/address-book" element={<AddressBook />} />
              <Route exact path="/my-wish-list" element={<MyWishlist />} />
              <Route exact path="/order-listing" element={<OrderListing />} />
              <Route exact path="/my-order/:id" element={<MyOrder />} />
              <Route exact path="/content/:identifier" element={<ContentPage />} />
              <Route exact path="/about-us" element={<AboutUs />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/compare" element={<Compare />} />
              <Route exact path="/blog-detail/:id" element={<BlogDetail />} />
              <Route exact path="/contact-us" element={<ContactUs />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/faqs" element={<FAQs />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ApolloProvider>
  );
};
export default App;

