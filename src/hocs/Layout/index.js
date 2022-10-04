
import React, { useState } from "react";
import Header from "../Layout/Header/Top-Bar";
import Footer from "../Layout/Footer/Footer";
import { useLocation } from "react-router";

const Layout = ({ children, recordId }) => {
	const location = useLocation();
	const currentUrl = location.pathname;
	const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
	const drawerToggleClickHandler = () => {
		setSideDrawerOpen(!sideDrawerOpen);
	};

	const HIDE_FOOTER_PAGES = [
		""

	];
	const HIDE_HEADER_PAGES = [
		""
	];
	const showHeader =
		HIDE_HEADER_PAGES.includes(currentUrl) ||
			HIDE_HEADER_PAGES.includes(
			)
			? false
			: true;
	const showFooter =
		HIDE_FOOTER_PAGES.includes(currentUrl) ||
			HIDE_FOOTER_PAGES.includes(
			)
			? false
			: true;
	return (
		<>
			<div className='bg-color3 '>
				{showHeader && (
					<Header
						className='headr'
						drawerToggleClickHandler={() => drawerToggleClickHandler()}
					/>
				)}

				{children}
				{showFooter && <Footer />}
			</div>
		</>
	);
};

export default Layout;