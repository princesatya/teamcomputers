
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiHandler } from '../../api';
import { endpoint } from '../../api/endpoint';
import { GET_ABOUT_US, GET_CMS_PAGE } from '../../assets/graphql';
import './contentPage.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ContentPage = () => {
	const { identifier } = useParams();
	const [cmsContent, setCmsContent] = useState({});

	const getCmsPage = async () => {
		if (!identifier) return;

		const result = await apiHandler({
			url: endpoint.GRAPHQL_URL,
			method: 'POST',
			data: {
				"base_url": endpoint.API_BASE_URL,
				"variables": { identifier: identifier },
				"query": GET_CMS_PAGE
			},
		});
		if (!result.data.error_code) {
			setCmsContent(result.data.cmsPage);
		}
	};

	useEffect(() => {
		getCmsPage();
	}, [identifier]);
	const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
	const unescapeHTML = (html) => {
		var escapeEl = document.createElement("textarea");
		escapeEl.innerHTML = html;
		return escapeEl.textContent;
	};
	return (
		<>
			{/* Banner */}
			<div className='banner mt-5'>
				{/* <img src="" alt='Team Computers' /> */}
				{/* {aboutUsData &&
					aboutUsData.map((about, index) => ( */}

				{/* ))} */}
			</div>
			<div className='mt-5'></div>
			{/* Banner End */}
			{/* About Info */}
			<section className='pt-5 pb-5'>
				<div className='container'>
					{/* {aboutUsData &&
						aboutUsData.map((about, index) => ( */}

					<div className='abouthead' style={{ marginTop: "50px" }}> {cmsContent.title}</div>
					<div>
						{renderHTML(unescapeHTML(cmsContent.content))}
					</div>
					{/* ))} */}
					{/* <div className='row d-flex align-items-center justify-content-center mb-5'>
						<div className='col-lg-7'>
							<div className='abouttext'>
								<h2>Who we are and what we do</h2>
								<p>
									<b>Team Computers</b> is a bridge between business needs and
									the world of IT solutions. We see ourselves as trusted
									solutions partner.We understand your needs,
									Identify-Integrate-Support High quality, affordable IT
									Solutions in Hardware, Software, Services, Mobility,
									Analytics and Cloud with Speed, Flexibility and an attitude
									of Sewa.
								</p>
								<p>
									Founded in 1987 by <b>Ranjan Chopra,</b> an alumnus of
									IIT-Kanpur, it has emerged as a leading IT Infrastructure
									and Information Solution Provider in the last three decades.
								</p>
								<p>
									With a turnover of <b>1500+ Cr,</b> having <b>25+</b>{' '}
									offices across India and <b>3,000+</b> members, we have
									served <b>2500+</b> customers over a span of 34+ years.
								</p>
							</div>
						</div>
						<div className='col-lg-5'>
							<iframe
								width='100%'
								height='315'
								src='https://www.youtube.com/embed/oUD9N4srwPs'
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen=''
							></iframe>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<div className='abouttext'>
								<h2>Our Vision</h2>
								<p>
									We are a place where people with ideas and a zeal to
									implement them, come together. A place where individuals are
									able to take success and failures in their stride. A
									platform where people challenge their own limits and extend
									their horizons.
								</p>
							</div>
						</div>

						<div className='col-md-6'>
							<div className='abouttext'>
								<h2>Our Mission</h2>
								<p>
									Provide an opportunity for growth, inspire excellence, value
									people and serve with pride. A platform to dream, think, and
									create solutions.
								</p>
							</div>
						</div>
					</div> */}
				</div>
			</section>
			{/* About Info End*/}
		</>
	);
}


export default ContentPage;
