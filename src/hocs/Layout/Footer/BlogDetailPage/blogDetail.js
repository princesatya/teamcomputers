import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FaCalendarAlt, FaEnvelope, FaFacebookSquare, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { GET_BLOG_DATA } from '../../../../assets/graphql';
import { apiHandler } from '../../../../api';
import { endpoint } from '../../../../api/endpoint';
import { useSelector } from 'react-redux';
import './blogDetail.css'

function BlogItemPage() {
    const { blog } = useSelector(
        (state) => state.home
    );
    const [selectedBlog, setSelectedBlog] = useState({});

    const { id } = useParams();
    useEffect(() => {
        // console.log(id);
        if (id) {
            const s_blog = blog &&
                blog.items &&
                blog.items.filter(b => Number(b.post_id) === Number(id));
            if (s_blog.length > 0) setSelectedBlog(s_blog[0]);
        }
    }, [id]);

    // console.log(blog);
    
    return (
        <>
            <section class="custombreadcrumb">
                <div class="container">
                    <ul class="breadcrumb justify-content-start">
                        <li class="breadcrumb-item"><Link to={'/home'}>Home</Link></li>
                        <li class="breadcrumb-item"><Link to={'/blogs'}>Blogs</Link></li>
                        <li class="breadcrumb-item active">
                            {selectedBlog.name}
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div className='blog-item-page'>
                    <div className='container'>
                        <div className='mx-5'>
                            <div className='display-5 mt-4'>
                                {selectedBlog.name}
                            </div>
                            <div ><FaCalendarAlt /> PUBLISHED ON |
                                {selectedBlog.publish_date}
                            </div>
                            <hr />
                            <div className='my-2'>
                                <ul class="blogsocialmedia m-0 p-0">
                                    <li><FaEnvelope /></li>
                                    <li><FaFacebookSquare /></li>
                                    <li><FaTwitter /></li>
                                    <li><FaLinkedin /></li>
                                </ul>
                            </div>
                            <img
                                src={selectedBlog.image} alt={selectedBlog.name} style={{ height: '40vh' }} />
                            <h3>Introduction</h3>
                            <p
                                dangerouslySetInnerHTML={{ __html: selectedBlog.post_content }}
                            ></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogItemPage;
