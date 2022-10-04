import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import './blogCard.css';

const Card = (data) => {
	return (
		<div className='card'>
			<Link to="">
				<img
					src={data.data.image}
					className='card-img'
					alt={data.data.name}
					style={{ height: '30vh' }}
				/>
			</Link>
			<div className='card-body'>
				<div className='card-date'>
					<FaCalendarAlt /> &nbsp;
					{data.data.publish_date}
				</div>
				<Link to={`/Blog/${data.data.post_id}/${data.data.name}`}>
					<h3 className='card-title'>{data.data.name}</h3>
				</Link>
				<p className='card-desc'>{data.data.short_description}</p>
				<Link to={`/Blog/${data.data.post_id}/${data.data.name}`}>
					<div className='card-read'>Read more...</div>
				</Link>
			</div>
		</div>
	);
};

export default Card;
