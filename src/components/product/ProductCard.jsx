// src/components/ProductCard/ProductCard.jsx
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function ProductCard({ product, renderAdd, isLinked = true }) {
	const [, dispatch] = useContext(DataContext);
	const [hasPrime] = useState(Math.random() < 0.5);

	const {
		id,
		title,
		price,
		description,
		image,
		rating = { rate: 0, count: 0 },
	} = product;

	const addToCart = (event) => {
		event.stopPropagation();
		event.preventDefault();
		console.log("Product in addToCart:", product);
		dispatch({
			type: "ADD_TO_CART",
			item: product, // Ensure this matches your reducer
		});
	};

	const productImage = (
		<img
			src={image}
			alt={title}
			className="rounded-lg object-contain mx-auto cursor-pointer"
			style={{ maxHeight: "200px", width: "auto" }}
		/>
	);

	return (
		<div className="relative flex flex-col justify-between bg-white z-30 p-4 md:p-6 h-full rounded-lg shadow-md cursor-default">
			{isLinked ? (
				<Link
					to={`/products/${id}`}
					className="relative flex-grow flex items-center justify-center mb-4"
				>
					{productImage}
				</Link>
			) : (
				<div className="relative flex-grow flex items-center justify-center mb-4">
					{productImage}
				</div>
			)}
			<div className="text-center w-full">
				<h4 className="font-semibold text-lg mb-2 cursor-default">{title}</h4>
				<div className="flex justify-center items-center mb-2">
					<Rating
						className="text-yellow-500"
						value={rating.rate}
						precision={0.1}
						readOnly
					/>
					<small className="ml-2 cursor-default">{rating.count}</small>
				</div>
				<p className="text-xs my-2 line-clamp-2 cursor-default">
					{description}
				</p>
				<div className="mb-4">
					<p className="text-lg font-semibold cursor-default">
						${price.toFixed(2)}
					</p>
				</div>

				{hasPrime && (
					<div className="flex items-center justify-center space-x-2 -mt-4">
						<img
							loading="lazy"
							src="/prime.png"
							alt="Prime"
							className="w-12"
							style={{ height: "48px", width: "auto" }}
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}

				{renderAdd && (
					<button
						className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-500 text-black font-bold py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-600 focus:ring-opacity-50 transition duration-300 ease-in-out w-60 hover:bg-gradient-to-b hover:from-yellow-500 hover:to-yellow-600"
						onClick={addToCart}
					>
						Add to Cart
					</button>
				)}
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		rating: PropTypes.shape({
			rate: PropTypes.number.isRequired,
			count: PropTypes.number.isRequired,
		}).isRequired,
	}).isRequired,
	renderAdd: PropTypes.bool,
	isLinked: PropTypes.bool,
};

export default ProductCard;
