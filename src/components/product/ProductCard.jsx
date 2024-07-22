import PropTypes from "prop-types";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function ProductCard({ product, renderAdd }) {
	const [, dispatch] = useContext(DataContext);

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
		dispatch({
			type: "ADD_TO_CART",
			item: product,
		});
	};

	return (
		<div className="relative flex flex-col justify-between bg-white z-30 p-4 md:p-6 h-full rounded-lg shadow-md cursor-default">
			<Link
				to={`/products/${id}`}
				className="relative flex-grow flex items-center justify-center mb-4"
			>
				<img
					src={image}
					alt={title}
					className="rounded-lg object-contain mx-auto cursor-pointer"
					style={{ maxHeight: "200px", width: "auto" }}
				/>
			</Link>
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
				{renderAdd && (
					<button
						className="py-2 px-4 w-4/5 bg-blue-500 text-white rounded-md text-center mx-auto cursor-pointer"
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
};

export default ProductCard;
