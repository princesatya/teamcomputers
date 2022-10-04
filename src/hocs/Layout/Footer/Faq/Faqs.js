import React, { useState, useEffect } from 'react';

import { BsChevronDown } from 'react-icons/bs';
import { BsChevronUp } from 'react-icons/bs';


import {
	Roww,
	MainDiv,
	ButtonDiv,
	IconDiv,
	ButtonText,
	DetailDiv,
	DetailText,
} from './ProductSpecification.styles';
// import { MetaTags } from 'react-meta-tags';
import { FAQS_DATA } from '../../../../assets/graphql';
import { saveBlog } from "../../../../features/HomePageSlice/homeDataSlice"
import { apiHandler } from '../../../../api';
import { endpoint } from '../../../../api/endpoint';

const FAQs = () => {
	const [openWaranty, setOpenWaranty] = React.useState(false);

	const [faqData, setFaqData] = useState({});

	const getFaqs = async (id) => {
		const result = await apiHandler({
			url: endpoint.GRAPHQL_URL,
			method: 'POST',
			// authToken: token,
			data: {
				"base_url": endpoint.API_BASE_URL,
				"variables": {},
				"query": FAQS_DATA
			},
		});
		setFaqData(result.data);
		console.log(result.data);
		// if (!result.data.error_code) {
		//   dispatch(saveproductDetails(result.data.products.items));
		// }
	}
	useEffect(() => {
		getFaqs();
	}, [])

	return (
		<>
			{/* <MetaTags>
				<title>Leading bathroom fittings and accessories brand in India</title>
			</MetaTags> */}
			<div className='banner'>
				<img src="{HeaderImages}" alt='' />
				<section class="custombreadcrumb">
					<div class="container">
						<ul class="breadcrumb justify-content-start">
							<li class="breadcrumb-item"><a href='/#/home' >Home</a></li>
							<li class="breadcrumb-item"><a href='/#/faqs'>faqs</a></li>

						</ul>
					</div>
				</section>
			</div>
			{/* <main className='main ' id={'view_first'}> */}
			<section>
				<div className='container mt-3'>
					<div className=' main-heading text-left '>
						{/* <h2>FAQs on Bathroom Products</h2> */}
					</div>
				</div>
			</section>
			{/* </main> */}
			<div className='faq-section'>
				<div className='container'>
					{faqData && faqData.Faqs && faqData.Faqs.map((item, index) =>
						<MainDiv className='dropdown' key={index}>
							{' '}
							<ButtonDiv
								onClick={() => setOpenWaranty((openWaranty) => !openWaranty)}
							>
								{' '}
								<Roww>
									{' '}
									<IconDiv>
										{!openWaranty && <BsChevronDown />}
										{openWaranty && <BsChevronUp />}{' '}
									</IconDiv>
									<ButtonText className='faqs'>
										{' '}
										{item.title}
									</ButtonText>{' '}
								</Roww>{' '}
							</ButtonDiv>{' '}
							{openWaranty && (
								<DetailDiv>
									<DetailText>
										<p>
											{' '}
											{item.content}
										</p>
									</DetailText>
								</DetailDiv>
							)}
						</MainDiv>
					)}

				</div>
			</div>

			<div className='extraspace'></div>
		</>
	);
};
export default FAQs;
