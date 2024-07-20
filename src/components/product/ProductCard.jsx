import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";

function ProductCard({ product }) {
	if (!product) {
		return null; // Or a placeholder component
	}

	const {
		id,
		title,
		price,
		category,
		description,
		image,
		rating = { rate: 0, count: 0 },
		hasPrime = false,
	} = product;

	return (
		<div className="relative flex flex-col justify-between bg-white z-30 p-4 md:p-6 h-full">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>
			<div className="relative flex-grow flex items-center justify-center mb-4">
				<a href={`/product/${id}`}>
					<img
						src={image}
						alt={title}
						className="rounded-lg"
						style={{ height: "200px", width: "200px" }}
					/>
				</a>
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
					<IntlProvider locale="en">
						<FormattedMessage
							id="price"
							defaultMessage="Price: {price}"
							values={{
								price: (
									<FormattedNumber
										value={price}
										style="currency"
										currency="USD"
									/>
								),
							}}
						/>
					</IntlProvider>
				</div>
				{hasPrime && (
					<div className="flex items-center justify-center space-x-2 mb-4">
						<img
							loading="lazy"
							src="/prime.png"
							alt="Prime"
							className="w-12"
							style={{ height: "40px", width: "40px" }}
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
				<button className="py-2 px-4 w-4/5 bg-blue-500 text-white rounded-md text-center mx-auto">
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
		hasPrime: PropTypes.bool.isRequired,
	}).isRequired,
};

export default ProductCard;
