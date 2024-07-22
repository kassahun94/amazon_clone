import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {

	if (!data) {
		return <div className="text-center">No category data available</div>;
	}

	return (
		<div className="relative flex flex-col justify-between bg-white p-4 md:p-6 m-5 shadow-md rounded-lg">
			<div className="flex-grow flex flex-col justify-between">
				<h2 className="text-lg font-semibold mb-2 text-center">{data.title}</h2>
				<Link
					to={`/categories/${encodeURIComponent(data.name)}`}
					className="block w-full text-center mb-2"
				>
					<img
						src={data.imgLink}
						alt={data.title ? `${data.title} Category Image` : "Category Image"}
						className="w-full h-56 object-contain mx-auto rounded-lg"
					/>
				</Link>
			</div>
			<div className="flex justify-center items-center py-2">
				<Link
					to={`/categories/${encodeURIComponent(data.name)}`}
					className="text-blue-500 font-semibold"
				>
					Shop Now
				</Link>
			</div>
		</div>
	);
}

CatagoryCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		imgLink: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
};

export default CatagoryCard;
