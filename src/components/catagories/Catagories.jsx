import catagoriesInfo from "./catagoriesInfo";
import CatagoryCard from "./CatagoryCard";

function Catagories() {
	return (
		<div className="mt-[-5rem] grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
			{catagoriesInfo.map((info, index) => {
				return <CatagoryCard key={index} data={info} />;
			})}
		</div>
	);
}

export default Catagories;
