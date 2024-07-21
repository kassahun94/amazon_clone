import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Type } from "../../utils/ActionType";
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ product }) {
	const [hasPrime] = useState(Math.random() < 0.5);
	const [, dispatch] = useContext(DataContext);

	const {
		id,
		title,
		price,
		category,
		description,
		image,
		rating = { rate: 0, count: 0 },
	} = product;

	const addToCart = (event) => {
		event.stopPropagation();
		dispatch({
			type: Type.ADD_TO_CART,
			item: {
				id,
				title,
				price,
				category,
				description,
				image,
				rating,
				hasPrime,
			},
		});
	};

	return (
		<div className="relative flex flex-col justify-between bg-white z-30 p-4 md:p-6 h-full rounded-lg shadow-md cursor-pointer">
			<div className="relative flex-grow flex items-center justify-center mb-4">
				<Link to={`/products/${id}`} className="block w-full text-center">
					<img
						src={image}
						alt={title}
						className="rounded-lg object-contain mx-auto"
						style={{ maxHeight: "200px", width: "auto" }}
					/>
				</Link>
			</div>
			<div className="text-center w-full">
				<h4 className="font-semibold text-lg mb-2">{title}</h4>
				<div className="flex justify-center items-center mb-2">
					<Rating
						className="text-yellow-500"
						value={rating.rate}
						precision={0.1}
						readOnly
					/>
					<small className="ml-2">{rating.count}</small>
				</div>
				<p className="text-xs my-2 line-clamp-2">{description}</p>
				<div className="mb-4">
					<p className="text-lg font-semibold">${price.toFixed(2)}</p>
				</div>
				{hasPrime && (
					<div className="flex items-center justify-center space-x-2 mb-4">
						<img loading="lazy" src="/prime.png" alt="Prime" className="w-14" />
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
				<button
					className="py-2 px-4 w-4/5 bg-blue-500 text-white rounded-md text-center mx-auto"
					onClick={addToCart}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		category: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		rating: PropTypes.shape({
			rate: PropTypes.number.isRequired,
			count: PropTypes.number.isRequired,
		}).isRequired,
	}).isRequired,
};

export default ProductCard;
