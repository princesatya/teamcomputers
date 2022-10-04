import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { GET_BLOG_DATA } from '../../../../assets/graphql';
import {saveBlog} from "../../../../features/HomePageSlice/homeDataSlice"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiHandler } from '../../../../api';
import { endpoint } from '../../../../api/endpoint';

const BlogPage = () => {
	// const [blog, setBlog] = useState({});
	const { blog } = useSelector(
        (state) => state.home
    );
	const dispatch = useDispatch();
	console.log(blog);
	const getBlogData = async (id) => {
		const result = await apiHandler({
			url: endpoint.GRAPHQL_URL,
			method: 'POST',
			// authToken: token,
			data: {
				"base_url": endpoint.API_BASE_URL,
				"variables": {},
				"query": GET_BLOG_DATA
			},
		});
		dispatch(saveBlog(result.data.mpBlogPosts));
		console.log(result.data.mpBlogPosts);
		// if (!result.data.error_code) {
		//   dispatch(saveproductDetails(result.data.products.items));
		// }
	}
	useEffect(() => {
		getBlogData();
	}, [])
	return (
		<>
			<section class="custombreadcrumb">
				<div class="container">
					<ul class="breadcrumb justify-content-start">
						<li class="breadcrumb-item"><Link to={'/home'}>Home</Link></li>
						<li class="breadcrumb-item active">Blogs</li>
					</ul>
				</div>
			</section>
			<section>
				<div className='my-5'>
					<div className='container'>
						<div className='row mx-md-4 mx-5'>
							{blog &&
								blog.items &&
								blog.items.map((item) => {
									console.log(item);
									return (
										<div className='col-md-4 col-12 blog-item' key={item.post_id}>
											<div className='card'>
												<Link to="">
													<img
														src={item.image}
														className='card-img'
														alt={item.name}
														style={{ height: '30vh' }}
													/>
												</Link>
												<div className='card-body'>
													<div className='card-date'>
														<FaCalendarAlt /> &nbsp;
														{item.publish_date}
													</div>
													<Link to={`/blog-detail/${item.post_id}`}>
														<h3 className='card-title'>{item.name}</h3>
													</Link>
													<p className='card-desc'>{item.short_description}</p>
													<Link to={`/blog-detail/${item.post_id}`}>
														<div className='card-read'>Read more...</div>
													</Link>
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BlogPage;
