import PropTypes from "prop-types";

function CatagoryCard({ data }) {
	return (
		<div className="relative flex flex-col justify-between bg-white p-4 md:p-6 m-5 h-full">
			<a href="#" className="flex flex-col h-full">
				<div className="flex flex-col flex-grow justify-between">
					<h2 className="text-lg font-semibold mb-2 text-center">
						{data.title}
					</h2>
					<img
						src={data.imgLink}
						alt={data.title}
						className="w-full h-53 object-cover mb-2 rounded-lg"
					/>
				</div>
				<div className="flex justify-center items-center py-2">
					<p className="text-blue-500 font-semibold">Shop Now</p>
				</div>
			</a>
		</div>
	);
}

CatagoryCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		imgLink: PropTypes.string.isRequired,
	}).isRequired,
};

export default CatagoryCard;
