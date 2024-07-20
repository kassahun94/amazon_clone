import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CatagoryCard({ data }) {
	return (
		<div className="relative flex flex-col justify-between bg-white p-4 md:p-6 m-5 h-full shadow-md rounded-lg">
			<Link
				to={`/category/${encodeURIComponent(data.name)}`}
				className="flex flex-col h-full"
			>
				<div className="flex flex-col flex-grow justify-between">
					<span>
						<h2 className="text-lg font-semibold mb-2 text-center">
							{data?.title}
						</h2>
					</span>
					<img
						src={data?.imgLink}
						alt={data?.title || "Category Image"}
						className="w-full h-48 object-cover mb-2 rounded-lg"
					/>
				</div>
				<div className="flex justify-center items-center py-2">
					<p className="text-blue-500 font-semibold">Shop Now</p>
				</div>
			</Link>
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
